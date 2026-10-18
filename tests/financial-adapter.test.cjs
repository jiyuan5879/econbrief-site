const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const context = {window:{}};
vm.runInNewContext(fs.readFileSync('companies/company-data.js','utf8'),context);
vm.runInNewContext(fs.readFileSync('companies/financial-adapter.js','utf8'),context);
const {fromProfile,metricValue,change}=context.window.EconFinancials;
const profile=context.window.companyProfiles.apple;
test('retains exact comparable nine-month revenue and net income',()=>{
 const [prior,current]=fromProfile(profile);
 assert.equal(prior.revenue,313.695);assert.equal(current.revenue,364.357);
 assert.equal(prior.netIncome,84.544);assert.equal(current.netIncome,101.464);
 assert.equal(current.duration,'Nine months');
 assert.ok(Math.abs(metricValue(current,'margin')-101.464/364.357*100)<1e-12);
 assert.ok(Math.abs(change(current,prior,'revenue').value-(364.357/313.695-1)*100)<1e-12);
 assert.equal(change(current,prior,'margin').unit,'percentage points');
 assert.equal(change(prior,null,'revenue'),null);
});
test('missing, non-numeric and incomplete values do not become zero',()=>{
 const copy=JSON.parse(JSON.stringify(profile));copy.revenueCategories[0].current=null;copy.cashFlow.netIncome.current=null;
 const [,current]=fromProfile(copy);assert.equal(current.revenue,null);assert.equal(current.netIncome,null);assert.equal(metricValue(current,'margin'),null);
 copy.revenueCategories[0].current='196.515';assert.equal(fromProfile(copy)[1].revenue,null);
 assert.equal(fromProfile({ticker:'OTHER',revenueCategories:[]}).length,0);
 assert.equal(fromProfile(null).length,0);
});
test('zero and negative profit remain data; undefined margins and growth stay missing',()=>{
 assert.equal(metricValue({revenue:10,netIncome:0},'netIncome'),0);
 assert.equal(metricValue({revenue:10,netIncome:-2},'margin'),-20);
 assert.equal(metricValue({revenue:0,netIncome:2},'margin'),null);
 assert.equal(change({revenue:4},{revenue:0},'revenue'),null);
 assert.equal(change({netIncome:4},{netIncome:-1},'netIncome'),null);
 assert.equal(metricValue({netIncome:NaN},'netIncome'),null);
});
