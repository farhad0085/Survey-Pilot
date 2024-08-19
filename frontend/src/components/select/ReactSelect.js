import React, { Component } from 'react'
import Select from 'react-select'

class ReactSelect extends Component {
  render() {

    const styles = {
      control: (baseStyles, state) => ({
        ...baseStyles,
        borderColor: state.isFocused ? 'initial' : 'hsl(0,0%, 92%)',
        minHeight: "40px"
      }),
    }

    return <Select {...this.props} styles={styles} />
  }
}

export default ReactSelect