import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from "../../styles/styles"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Divider from '@material-ui/core/Divider';

import DeleteIcon from '@material-ui/icons/Delete';

const SurveyGeneral = (props) => {
	const { survey, handleSurvey } = props;

	return (
		<React.Fragment>
			<TextField 
				type='text'
				name="title"
				label='Titulo del cuestionario' 
				value={survey.title} 
				onChange={handleSurvey} 
				margin='normal' />

		
			<TextField 	
				type='text'
				name='description'
				fullWidth
				multiline
				rows={4} 
				label='Descripcion' 
				value={survey.description} 
				onChange={handleSurvey} 
				margin='normal' />
		</React.Fragment>
		);	
}

const SurveyAddElement = (props) => {

	const classes = makeStyles(styles)();
	const { item, handle, addElement } = props;

	return (
		<Grid container>			
			<Grid item md={4}>
				<TextField
					fullWidth
					value={item.title}
					name="title"
					type="text"
					onChange={handle}
					label="Pregunta"
					id="itemTitle"
					/>
			</Grid>
			<Grid item md={4}>
				<FormControl className={classes.formControl}>
			        <InputLabel htmlFor='itemType'>Tipo de campo</InputLabel>
			        <NativeSelect
					  name="type"
			          value={item.type}
			          onChange={handle}
			          id="itemType"
			        >
			        	<option value="text">Texto</option>
			        	<option value="checkbox">Opcion multiple</option>
			        	<option value="radio">Opcion unica</option>
			        	<option value="select">Opcion unica, desplegable</option>
			        	<option value="select-multi">Opcion multiple desplegable</option>
		        	</NativeSelect>
		        </FormControl>
	        </Grid>
	        <Grid item md={4}>
				<TextField 
		        	name="tip"
					value={item.tip}
					type="text"
					onChange={handle}
					label="Informacion adicional"
					id="tipId"
					/>
				<FormControl>
					<label></label>
					<IconButton onClick={addElement} className="MuiInput-formControl" color="primary" aria-label="add">
			        		<AddCircleOutlineIcon  />
			      	</IconButton>
		      	</FormControl>
	      	</Grid>
		</Grid>
		);
}

const RenderCheckboxFragment = (props) => {
	const { item, name, handleOptionChange, handleValueChange, handleDelete } = props;
	const groupName = name + "-group";
	const elementId = name.replace("element-","");
	const classes = makeStyles(styles)();

	return (
		<React.Fragment >
			<FormGroup aria-label={item.title} name={groupName} value={item.selected} >
			
				{item.value.map((val, idx)=>{
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
			
				{item.value.map((val, idx)=>{
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
										onChange={(e)=>handleValueChange(name.replace("element-",""), idx, e.target)} />} 
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
	const { item, multiline } = props;

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
					>	
						{ 
							valueName.split(',').map( (val, key) => {
								if(!item.value[key]) item.value[key] = {};
								item.value[key].option = val;

								return (
									<option key={key} value={val}>{val}</option> 
								)})
						}
				</Select>
				</Grid>
			</Grid>
		</React.Fragment>
	)
};

const RenderOption = (props) => {
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

//TODO: Agregar WYSIWYG

function Survey(props) {
	const classes = makeStyles(styles)();
	const blankItem = {type: "text", title: "", tip:"", value:[]};
	const blankValue = {name:"", option: "", selected: false};

	const [ survey, setSurvey] = useState({ title: "", description: "" });	
	const [ item, setItem ] = useState({...blankItem});	
	const [ items, setItems ] = useState([]);
	
	const handleChange = (event) => {
		const updatedItems = [...items];

		const idx = event.target.id.substring(event.target.id.indexOf("-")+1);
		const name = event.target.id.substring(0, event.target.id.indexOf("-"));
		
		updatedItems[idx][name] = event.target.value;
		
		setItems(updatedItems);
	}

	const handleDelete = (elementId, optionId) => {
		const copy = [...items];
		const valueCopy = [...items[elementId].value];

		console.log(valueCopy, elementId, optionId);

		console.log(valueCopy.splice(optionId, 1));

		copy[elementId].value = valueCopy;

		setItems(copy);
	}

	const handleValueChange = (itemID, optionID) => {
		const copy = [...items];
		
		if(copy[itemID].type === "checkbox") {
			copy[itemID].value[optionID].selected= !copy[itemID].value[optionID].selected;	
		} else {
			copy[itemID].value.map((value) => value.selected= false);
			copy[itemID].value[optionID].selected= true;	
		}		
		
		setItems(copy);				
	}

	const addElement = () => {
		const element = {...item};
		
		element.type = item.type;
		element.title = item.title;
		element.tip = item.tip;

		if( item.type !== 'text') element.value.push({...blankValue});
		
		setItems([...items, element]);

		setItem({...blankItem});
	}

	const handle = (e) => {
		const copy = {...item};
		copy[e.target.name] = e.target.value;
		
		setItem(copy);
	}

	const handleSurvey = (e) => {
		const copy = {...survey};
		copy[e.target.name] = e.target.value;
		
		setSurvey(copy);
	}

	const addOption = (idx) => {
		const updatedItems = [...items];
		updatedItems[idx].value.push({...blankValue});

		setItems(updatedItems);
	}

	const handleOptionChange = (event) => {
		let idSections = event.target.id.split("-");
		let idOption = idSections[idSections.length - 1];
		let idElement = idSections[idSections.length -2];
		let name = idSections[0];

		const updatedItems = [...items];

		updatedItems[idElement].value[idOption][name] = event.target.value;
		
		updatedItems[idElement].value[idOption].name = event.target.id;

		setItems(updatedItems);
	}

	const handleDeleteItem = (e) => {
		const itemNum = e.currentTarget.id.replace("delete-", "");
		const copy = [...items];

		copy.splice(itemNum, 1);

		setItems(copy);
	}

	return (
		<Grid>

			<Paper className={classes.paper} elevation={5}>

				<SurveyGeneral handleSurvey={ handleSurvey } survey={ survey } />
				
				<Divider className={classes.spacedDivider} />

				<SurveyAddElement handle={handle} addElement={addElement} item={item} />

				<div>


				{items.map((item,idx)=>{
					const titleId = "title-"+idx;
					const tipId = "tip-"+idx;
					const name = "element-"+idx;

					return (
						<Grid container key={idx}>
							<Grid item md={1}>
								<IconButton id={"delete-" + idx} onClick={handleDeleteItem}><DeleteIcon /></IconButton>
							</Grid>
							<Grid item md={3}>
								<TextField name={titleId}
									value={item.title}
									id={titleId}
									onChange={handleChange}
									label="Pregunta"
									/>
							</Grid>
							<Grid item md={2}>
								<TextField name={tipId}
									value={item.tip}
									id={tipId}
									onChange={handleChange}
									label="Informacion adicional"
									/>
								{(item.type === "radio" || item.type === "checkbox") && 
								<FormControl>
									<label></label>
									<IconButton onClick={(e)=>addOption(idx)} 
										className="MuiInput-formControl" 
										color="secondary" aria-label="add">
							        		<AddCircleOutlineIcon  />
							      	</IconButton>
						      	</FormControl>
						      	}
					      	</Grid>
							<Grid item md={5}>
								<RenderOption 
									handleOptionChange={handleOptionChange} 
									handleValueChange={handleValueChange}
									handleDelete={handleDelete}
									name={name} type={item.type} item={item} />
							</Grid>
							<Grid item md={1}>

							</Grid>
						</Grid>
						)
				})}
				</div>
			</Paper>

		
		</Grid>
		);
} 

export default (Survey);