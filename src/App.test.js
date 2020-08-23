import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Header from './components/Header/component'
import ProductList from './screens/Product/List/component'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() });
describe("Testing App", ()=> {
  test('test', () => {
    const wrapper = Enzyme.shallow(<App />);
    expect(wrapper.find("Header"))

  });
})

describe("Testing ProductList", ()=> {
  test('Product list has a Button', () => {
    const wrapper = Enzyme.shallow(<ProductList />);
    console.log(wrapper.debug())
    expect(wrapper.find("Button"));
    expect(wrapper.find("Table"));
  });
})