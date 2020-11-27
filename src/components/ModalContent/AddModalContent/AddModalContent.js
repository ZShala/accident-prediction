import React from 'react';
import classes from './AddModalContent.module.css';
import CloseBtn from '../../../assets/images/cancel.png';
import FormInput from '../../Form-Input/Form-Input';
import Button from '../../UI/Button/Button';

class ModalContent extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          name: '',
          location: '',
          date: ''
        };
      }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };
   render(){
    return (
        <div className={classes.Modal}>
            <img className={classes.Cancel} src={CloseBtn} alt='Cancel' onClick={this.props.closed} />
            <FormInput 
            name='name'
            type='text'
            value={this.state.name}
            handleChange={this.handleChange}
            label='Emri i raportuesit'
            required/>
             <FormInput
            name='location'
            type='text'
            value={this.state.location}
            handleChange={this.handleChange}
            label='Lokacioni i aksidentit'
            required
          />
            <FormInput
            name='date'
            type='date'
            value={this.state.date}
            handleChange={this.handleChange}
            label='Data e aksidentit'
            required
          />
          <Button btnType='Success'>Shto Aksidentin</Button>
        </div>
    )
}
}
export default ModalContent;