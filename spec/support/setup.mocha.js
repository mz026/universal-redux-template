import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import jsdom from 'jsdom';

chai.use(sinonChai);
chai.use(chaiAsPromised);

global.sinon = sinon;
global.expect = chai.expect;

global.document = jsdom.jsdom('<html><head><script></script></head><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
