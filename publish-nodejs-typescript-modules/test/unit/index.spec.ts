import { expect } from 'chai';
import 'mocha';
import { sayHello } from '../../index';

describe('My Greeter', () => {
  it('my first test', () => {
    expect(sayHello('Carl')).equal('Hello Carl');
  });
});
