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
import { makeStyles } from '@material-ui/core/styles';
import { styles } from "../../../styles/styles"
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

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

const RenderCheckboxFragment = (props) => {
	const { item, name, handleOptionChange, handleValueChange, handleDelete } = props;
	const groupName = name + "-group";
	const elementId = name.replace("element-","");
	const classes = makeStyles(styles)();

	return (
		<React.Fragment >
			<FormGroup aria-label={item.title} name={groupName} value={item.selected} >
			
				{item.values.map((val, idx)=>{
					const valueName = "option-" + name + "-" +idx;
					
					return(
						
						<React.Fragment key={idx}>
							<Grid container>
								<Grid item sm={2} md={2}>
									<IconButton className={classes.surveyFormControl} 
										onClick={()=>handleDelete(elementId, idx)}><DeleteIcon />
									</IconButton> 
								</Grid>
								<Grid item sm={10} md={5}>
									<FormControl error={val.option.length === 0}>
										<InputLabel>Valor de la Opcion</InputLabel>
										<Input 
											name={valueName}
											id={valueName}
											value={val.option}
											onChange={handleOptionChange}
											fullWidth
											>
										</Input>
									</FormControl>
								</Grid>
								<Grid item sm={12} md={5}>
									<FormControlLabel 
										className={classes.surveyFormControl}
										value={val.option.replace(/ /g, "_")} 
										control={<Checkbox id={"optionid-"+idx} 
										onChange={(e)=>handleValueChange(elementId, idx, e.target)} />} 
										label={val.option} 
										/>
								</Grid>
							</Grid>									
						</React.Fragment>
						)
				})}
			</FormGroup>
		</React.Fragment>					
	);
};

const RenderRadioFragment = (props) => {
	const { item, name, handleOptionChange, handleValueChange, handleDelete } = props;
	const groupName = name + "-group";
	const elementId = name.replace("element-","");
	const classes = makeStyles(styles)();

	return (
		<React.Fragment >
    	    <RadioGroup aria-label={item.title} name={groupName} value={item.selected} >
			
				{item.values.map((val, idx)=>{
					const valueName = "option-" + name + "-" +idx;
					
					return(
						<React.Fragment key={idx}>
							<Grid container> 
							<Grid item sm={2}>
									<IconButton className={classes.surveyFormControl} 
										onClick={()=>handleDelete(elementId, idx)}><DeleteIcon />
									</IconButton> 
								</Grid>
								<Grid item sm={10} md={5}>
									<TextField name={valueName}
										id={valueName}
										label="Valor de la Opcion"
										value={val.option}
										onChange={handleOptionChange}
										fullWidth
										/>
								</Grid>
								<Grid item sm={12} md={5}>
									<FormControlLabel 
										className={classes.surveyFormControl}
										value={val.option.replace(/ /g, "_")} 
										control={<Radio id={"optionid-"+idx} 
										onChange={(e)=>handleValueChange(elementId, idx)} />} 
										label={val.option} 
										/>
								</Grid>
							</Grid>									
						</React.Fragment>
						)
				})}
			</RadioGroup>
		</React.Fragment>					
	);
};

const RenderSelectFragment = (props) => {
	const { item, name, multiline, handleValueChange } = props;
	const elementId = name.replace("element-","");

	const [valueName, setValueName] = useState("");

	const classes = makeStyles(styles)();

	const update = (e) => {
		setValueName(e.target.value) ;
	}

	return (
		<React.Fragment>
			<Grid container>
				<Grid item sm={12} md={6}>
					<TextField name={valueName}
					label="Valores separado por coma"
					onChange={update}
					fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
				<Select
					
					multiple={multiline}
					native
					className={classes.surveyFormControl}
					fullWidth
					onChange={(e)=>handleValueChange(elementId, e.target.selectedIndex, e.target)}
					>	
						{valueName.split(',').map( (val, key) => {
							if(!item.values[key]) item.values[key] = {};
							item.values[key].option = val;

							return (
								<option id={"option-" + name + "-" + key} key={key} value={val}>{val}</option> 
							)})}
				</Select>
				</Grid>
			</Grid>
		</React.Fragment>
	)
};

export const RenderOption = (props) => {
	const { type } = props;
					
	if(type === "radio") {
		return (
			<RenderRadioFragment {...props} />					
		);			
	} else if(props.type === "checkbox") {
		return (
			<RenderCheckboxFragment {...props} />
		);
	} else if(props.type === "select" || props.type === "select-multi") {
		return (
			<RenderSelectFragment {...props} multiline={props.type === "select-multi"} />
		)
	}

	return null
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

const RenderRadio = (props) => {
	const {reply, element, handleItemChange} = props;
	const id = element.name.replace("element-", "");
	
	const classes = makeStyles(styles)();
	const { value, error } = reply.items[id];
	
	return (
		<FormControl error={error} className={classes.surveyFormControl}>
			<RadioGroup name={element.name} value={value} 
				onChange={handleItemChange} error>
					{element.options.map((option, idx)=> 
						<FormControlLabel key={idx} 
							value={option.name} 
							control={<Radio />} label={option.value} />
					)}				
			</RadioGroup>
			{error && <FormHelperText>Este elemento es requerido</FormHelperText>}
		</FormControl>
		)
}

const RenderCheckbox = (props) => {
	const classes = makeStyles(styles)();
	
	const {reply, element, handleCBChange} = props;
		
	const id = element.name.replace("element-", "");
	const { values, error } = reply.items[id];
	console.log(values)

	return(
		<FormControl error={error} className={classes.surveyFormControl}>
			{element.options.map((option, idx)=>{
				return (<FormControlLabel
					key={idx}
					onChange={(e)=>handleCBChange(id,e)}
					control={<Checkbox checked={values.includes(option.name)} value={option.name} />}
					label={option.value}
				/>)
			})}
			{error && <FormHelperText>Este elemento es requerido</FormHelperText>}
		</FormControl>
	)
}

export const RenderSelect = (props) => {
	const {reply, element, handleSelect} = props;
	const id = element.name.replace("element-", "");
	const classes = makeStyles(styles)();
	const { error } = reply.items[id];

	let values = reply.items[id].values;
	
	const isMultivalued = true === element.multivalued;

	if(!isMultivalued) values = reply.items[id].values[0];
	
	return (
		<FormControl fullWidth error={error} className={classes.surveyFormControl}>
			<Select 
				
				value={values}
				name={element.name}
				id={element.name}
				multiple={isMultivalued}
				native
				onChange={handleSelect}
			>	
				{!isMultivalued && <option value="">Elija uno</option> }
				
				{element.options.map((option, idx) =>
					<option key={idx} value={option.name}>{option.value}</option>
				)}
			</Select>
				{ error && <FormHelperText>Este elemento es requerido</FormHelperText> }
		</FormControl>
	)
}

export default DisplayNodeHeader;