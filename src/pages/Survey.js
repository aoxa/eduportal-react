import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from "../styles/styles"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


//TODO: Agregar WYSIWYG

function Survey(props) {
	const { classes } = props;
	const [ item, setItem ] = useState({type: "text", title: "", tip:"", value:[]});

	const [ title, setTitle ] = useState("");
	const [ description, setDescription ] = useState("");
	const [ itemType, setItemType ] = useState("");
	const [ itemTitle, setItemTitle ] = useState("");
	const [ itemTip, setItemTip ] = useState("");

	const blankItem = {type: "Texto", title: "", tip:"", value:[]};
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
		const element = {...item};
		
		element.type = item.type;
		element.title = item.title;
		element.tip = item.tip;
		element.value.push({...blankValue})
		
		setItems([...items, element]);

		setItem({...blankItem});
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
								<React.Fragment key={idx}>
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

	const handle = (e) => {
		console.log(item)
		const cp = {...item};
		cp[e.target.name] = e.target.value;
		setItem(cp);
	}

	return (
		<Grid>

			<Paper className={classes.paper} elevation={5}>

				<TextField 
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
				
				<Grid container>
					<Grid item md={4}>
						<TextField name="itemTitle" 
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

				<div>


				{items.map((item,idx)=>{
					const typeId = "type-"+idx;
					const titleId = "title-"+idx;
					const tipId = "tip-"+idx;
					const valueId = "value-"+idx;
					const name = "element-"+idx;

					return (
						<Grid container key={idx}>
							<Grid item md={3}>
								<TextField name={titleId}
									value={items[idx].title}
									id={titleId}
									onChange={handleChange}
									label="Pregunta"
									/>
							</Grid>
							<Grid item md={3}>
								<TextField name={tipId}
									value={items[idx].tip}
									id={tipId}
									onChange={handleChange}
									label="Informacion adicional"
									/>
								<FormControl>
									<label></label>
									<IconButton onClick={(e)=>addOption(idx)} className="MuiInput-formControl" color="secondary" aria-label="add">
							        		<AddCircleOutlineIcon  />
							      	</IconButton>
						      	</FormControl>
					      	</Grid>
							<Grid item md={6}>
								<RenderOption name={name} type={items[idx].type} item={items[idx]} />
							</Grid>
							
						</Grid>
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