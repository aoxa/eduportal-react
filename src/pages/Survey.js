import React, { useState } from 'react';
import { withStyles }  from '@material-ui/core/styles';
import { styles } from "../styles/styles"
import { TextField, Paper, Button, Grid } from '@material-ui/core';
import { RadioGroup, Radio, FormControlLabel, FormControl, InputLabel, NativeSelect } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


//TODO: Agregar WYSIWYG

function Survey(props) {
	const { classes } = props;
	const [ title, setTitle ] = useState("");
	const [ description, setDescription ] = useState("");
	const [ itemType, setItemType ] = useState("");
	const [ itemTitle, setItemTitle ] = useState("");
	const [ itemTip, setItemTip ] = useState("");

	const blankItem = {type: "", title: "", tip:"", value:[]};
	const blankValue = {option: "", selected: false};
	const [ items, setItems ] = useState(
		[]);
	
	function handleChange(event) {
		const updatedItems = [...items];
	
		const idx = event.target.id.substring(event.target.id.indexOf("-")+1);
		const name = event.target.id.substring(0, event.target.id.indexOf("-"));
		
		updatedItems[idx][name] = event.target.value;
		
		setItems(updatedItems);
	}

	function handleValueChange(event) {
		const idx = event.target.id.substring(event.target.id.indexOf("-")+1);
						
	}

	function addElement() {
		const element = {...blankItem};
		element.type = itemType;
		element.title = itemTitle;
		setItemTitle("");
		element.tip = itemTip;
		setItemTip("");
		element.value.push({...blankValue})
		setItems([...items, element]);
	}

	function addOption(idx) {
		const updatedItems = [...items];
		updatedItems[idx].value.push({...blankValue});
		setItems(updatedItems);
	}

	function handleOptionChange(event) {
			let idSections = event.target.id.split("-");
		let idOption = idSections[idSections.length - 1];
		let idElement = idSections[idSections.length -2];
		let name = idSections[0];
		const updatedItems = [...items];

		updatedItems[idElement].value[idOption][name] = event.target.value;

		
		setItems(updatedItems);
	}

	function RenderOption(props) {
		const { type, item, name } = props;
		const groupName = name + "-group";
						
		if(type === "radio") {
			return (
				<div>		
					<FormControl component="fieldset" >
			    	    <RadioGroup aria-label={item.title} name={groupName} value='' onChange={(e)=>console.log(e.target.value)}>
							
						{item.value.map((val, idx)=>{
							const valueName = "option-" + name + "-" +idx;
							
							return(
								<React.Fragment>
									<TextField name={valueName}
											id={valueName}
											label="Opcion"
											defaultValue={item.value[idx].option}
											onBlur={handleOptionChange}
											/>
									<FormControlLabel 
											value={item.value[idx].option.replace(" ", "_")} 
											control={<Radio />} 
											label={item.value[idx].option} 
											/>
								</React.Fragment>
								)
						})}

						</RadioGroup>
					</FormControl>
				</div>
						
			)
				
		} else if(props.type === "checkbox") {

		}

		return (
			<div>aaa</div>)
	}

	return (
		<Grid>

			<Paper className={classes.paper} elevation={5}>

				<TextField 	name='title'
					label='Titulo del cuestionario' 
					value={title} 
					type='text'
					onChange={e => {setTitle(e.target.value)}} 
					margin='normal' />

			
				<TextField 	name='title'
					multiline={true}
					fullWidth 
					label='Descripcion' 
					value={description} 
					type='text'
					onChange={e => {setDescription(e.target.value)}} 
					margin='normal' />
				
				<div>
					<TextField name="itemTitle"
						value={itemTitle}
						type="text"
						onChange={(e)=>{setItemTitle(e.target.value)}}
						label="Pregunta"
						id="itemTitle"
						/>
						
					<FormControl className={classes.formControl}>
				        <InputLabel htmlFor='itemType'>Tipo de campo</InputLabel>
				        <NativeSelect
						  name="itemType"
				          value={itemType}
				          onChange={(e)=>{setItemType(e.target.value)}}
				          id="itemType"
				        >
				        	<option value="text">Texto</option>
				        	<option value="checkbox">Opcion multiple</option>
				        	<option value="radio">Opcion unica</option>
				        	<option value="select">Opcion unica, desplegable</option>
				        	<option value="select-multi">Opcion multiple desplegable</option>
			        	</NativeSelect>
			        </FormControl>
			        <TextField name="tipId"
						value={itemTip}
						type="text"
						onChange={(e)=>{setItemTip(e.target.value)}}
						label="Informacion adicional"
						id="tipId"
						/>
					<FormControl>
						<label></label>
						<Button onClick={addElement} className="MuiInput-formControl" color="primary" aria-label="add">
				        		<AddCircleOutlineIcon  />
				      	</Button>
			      	</FormControl>
				</div>

				<div>


				{items.map((item,idx)=>{
					const typeId = "type-"+idx;
					const titleId = "title-"+idx;
					const tipId = "tip-"+idx;
					const valueId = "value-"+idx;
					const name = "element-"+idx;

					return (
						<div key={idx}>
							<TextField name={titleId}
								value={items[idx].title}
								id={titleId}
								onChange={handleChange}
								label="Pregunta"
								/>
							<TextField name={tipId}
								value={items[idx].tip}
								id={tipId}
								onChange={handleChange}
								label="Informacion adicional"
								/>
							<FormControl>
								<label></label>
								<Button onClick={(e)=>addOption(idx)} className="MuiInput-formControl" color="secondary" aria-label="add">
						        		<AddCircleOutlineIcon  />
						      	</Button>
					      	</FormControl>
							<RenderOption name={name} type={items[idx].type} item={items[idx]} />
						</div>
						)
				})}
				</div>
			</Paper>

			<form className={classes.form} onSubmit={ (e) => {
					e.preventDefault();
					setItems([...items, {title: title, id: Date.now()}]);
					setTitle("");
				} }>
				
      		</form>
		</Grid>
		);
} 

export default withStyles(styles)(Survey);