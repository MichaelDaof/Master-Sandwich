import React, { View, Text, ListView } from 'react-native'
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai'

// App components
import AllAdventureDetail from '../../src/components/AllAdventures/AllAdventureDetail'
import AllAdventureLi from '../../src/components/AllAdventures/AllAdventureLI'
import AllAdventuresContainer from '../../src/components/AllAdventures/AllAdventuresContainer'
import AllAdventuresList from '../../src/components/AllAdventures/AllAdventuresList'

import { adventure } from '../mockData'


describe('#AllAdvenContainer component should exist', function (){

  var adventures = [adventure, adventure]
  const wrapper = shallow(<AllAdventuresContainer />)

  it('component should exists', () => {
    expect(wrapper).to.exist
  })

  it('should render AllAdventureList'/*, function (){
    // gotta add props to AllAdventureList somehow
    expect(wrapper.find('AllAdventureList')).to.exist
  }*/)

  it('getAllAds method should exist')

  it('getAllAds should be called when mounted')

  it('should render AllAdventuresList')

})

describe('#AllAdventureList component should exist', function (){

  var adventures = [adventure, adventure]

  const wrapper = shallow(<AllAdventuresList advens={adventures}/>)

  it('AllAdventureList component should exists', () => {
    expect(wrapper).to.exist
  })

  it('should render as many AllAdventureLi as there are items in props.adven', function() {
    expect(wrapper.prop('advens')).to.exist
    // expect(wrapper.find('ScrollView').children()).to.have.length(2)
  })

})

describe('#AllAdventureLi component should exist', function (){

  const wrapper = shallow(<AllAdventureLi adven={adventure}/>)

  it('AllAdventureLi component should exists', () => {
    expect(wrapper).to.exist
  })

  it('should have TouchableHighlight')

})

describe('#AllAdventureDetail', () => {

  const wrapper = shallow(<AllAdventureDetail adven={adventure} />)

  it('AllAdventureDetail component should exists', () => {
    expect(wrapper).to.exist
  })

})
