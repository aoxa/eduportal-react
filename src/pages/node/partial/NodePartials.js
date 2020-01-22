import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';


const DisplayNodeHeader = (props) => {

	const { userId, title } = props;
	const [ user, setUser ] = useState({id: '076aa244-3685-11ea-aec2-2e728ce88125', username: 'aoxa', firstName: 'Pepe', lastName: 'Trueno'});
	
	return (
			<React.Fragment>
				<Typography variant="h4">{title}</Typography>
				<Typography variant="subtitle2" gutterBottom>{user? "Publicado $ por " + user.username : "cargando" }</Typography>
			</React.Fragment>
		);
};

export const Options = (props) => {
	const {element, handleItemChange, reply} = props;
	const id = element.name.replace("element-", "");

	if( element.type === null) {		
		return (<Input fullWidth name={element.name} onChange={handleItemChange} value={reply.items[id].value}>{element.title}</Input>)
	} 
	if(element.radioButton) {
		return (<RenderRadio {...props} />)
	}
	if(element.checkBox) {
		return (<RenderCheckbox {...props} />)
	}

	return (<RenderSelect {...props} />)
}

export const RenderElement = (props) => {
	const { element } = props;

	return (
		<Grid container>
			<Grid item sm={5} >
				<Typography variant="body1">{element.title}</Typography>
			</Grid>
			<Grid item sm={7}>
				<Options {...props} />
			</Grid>
		</Grid>
	)		
}

export const RenderRadio = (props) => {
	const {reply, element, handleItemChange} = props;
	const id = element.name.replace("element-", "");

	const  value = reply.items[id].value;

	return (
		<RadioGroup fullWidth name={element.name} value={value} onChange={handleItemChange}>
			{element.options.map((option, idx)=> <FormControlLabel key={idx} value={option.value} control={<Radio />} label={option.value} />
			)}				
		</RadioGroup>
		)
}

export const RenderCheckbox = (props) => {
	const {reply, element, handleCBChange} = props;
	const id = element.name.replace("element-", "");

	let  values = reply.items[id].values;

	return(
		<FormGroup >
			{element.options.map((option, idx)=>{
				return (<FormControlLabel
					key={idx}
					onChange={()=>handleCBChange(id, idx)}
					control={<Checkbox checked={values[idx]} value={option.name} />}
					label={option.value}
				/>)
			})}
		</FormGroup>
	)

}

export const RenderSelect = (props) => {
	const {reply, element, handleSelect} = props;
	const id = element.name.replace("element-", "");

	let values = reply.items[id].values;

	const isMultivalued = true == element.multivalued;

	if(!isMultivalued) values = reply.items[id].values[0];
	
	return (
		<Select 
				fullWidth
				value={values}
				name={element.name}
				id={element.name}
				multiple={isMultivalued}
				native
				onChange={handleSelect}
			>	
				{element.options.map((option, idx) =>
					<option key={idx} value={option.value}>{option.value}</option>
				)}
			</Select>
	)
}

export default DisplayNodeHeader;