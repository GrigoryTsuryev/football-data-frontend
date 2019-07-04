import React from 'react'
import { shallow, mount } from 'enzyme'


import App from './App'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './components/Main'
import axios from 'axios'
import MediaCard from './components/item/item'

Enzyme.configure({ adapter: new Adapter() });
Enzyme.configure({ disableLifecycleMethods: true });

it('invokes `componentDidMount` when mounted', () => {
  jest.spyOn(Main.prototype, 'componentDidMount');
  mount(<Main />);
  expect(Main.prototype.componentDidMount).toHaveBeenCalled();
  Main.prototype.componentDidMount.mockRestore();
});

it("renders correctly", () => {
  const wrapper = shallow(
    <App />
  );
  expect(wrapper).toMatchSnapshot();
});


it("Adding to state return cards", () => {
  const wrapper = shallow(
    <Main />
  );
  let competitions = [{
    area:{
      name: "Brazilia"
    },
    name: 'Liga',
    id: 4
  }
  ]
  wrapper.setState({ competitions});
  expect(wrapper.contains(<MediaCard></MediaCard>))
});

