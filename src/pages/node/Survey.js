import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from "../../styles/styles"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { MuiPickersUtilsProvider,DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { properties } from '../../properties';

import DisplayNodeHeaders, { RenderElement, RenderOption } from './partial/NodePartials';

const SurveyGeneral = (props) => {
	const { survey, handleSurvey, handleDateChange } = props;
	const minDate = new Date();
	const maxDate = new Date();
	minDate.setDate(minDate.getDate() + 4);
	maxDate.setDate(maxDate.getDate() + 63);

	const classes = makeStyles(styles)();

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Box display="flex">
				<FormControl className="MuiFormControl-marginNormal" error={survey.title.length === 0} >
					<InputLabel>Titulo del cuestionario</InputLabel>
					<Input 
						name="title"
						value={survey.title} 
						onChange={handleSurvey} 
						 />
						{ survey.title.length === 0 && 
							<FormHelperText >Este campo es requerido</FormHelperText> }
				</FormControl>
				<div className={classes.grow}></div>

				<DatePicker 
					className="MuiFormControl-marginNormal" 
					value={survey.expiryDate} 
					label="Fecha de finalizacion"
					minDate={minDate}
					maxDate={maxDate}
					format="dd/MM/yyyy"
					onChange={handleDateChange} />

			</Box>			
		
			<FormControl 
					fullWidth
					className="MuiFormControl-marginNormal" 
					error={survey.description.length === 0} >
				<InputLabel>Descripcion</InputLabel>
				
				<Input 	
					type='text'
					name='description'
					fullWidth
					multiline
					rows={4}  
					value={survey.description} 
					onChange={handleSurvey} 
					 />
					{survey.description.length === 0 &&
						<FormHelperText>Este campo es requerido</FormHelperText> }
			</FormControl>
		</MuiPickersUtilsProvider>
		);	
}

const SurveyAddElement = (props) => {

	const classes = makeStyles(styles)();
	const { item, handle, addElement } = props;

	return (
		<Grid container>			
			<Grid item md={12}>
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

export const ViewSurveyReply = (props) => {
	const classes = makeStyles(styles)();
	const [ data, setData ] = useState({loading:true});
	
	useEffect(() => { 
		if(data.loading) {
			const { surveyid, replyid } = props.match.params;
			Axios.all([
				Axios.get(properties.server + "surveys/"+surveyid),
				Axios.get(properties.server + "surveys/"+surveyid + "/reply/" + replyid)
			]).then(Axios.spread((survey, replyResponse) => {
				let reply = {...replyResponse.data};
				reply.items = reply.elements.map((el)=>{
					return {...el, 
						error: false,
						values: el.options.map((op)=>op.name),
						value: el.options[0].name
					}
				});
				console.log(reply.items.sort((a,b)=> a.name < b.name? -1:1));
				console.log(survey.data)
				
				setData({loading:false, survey: survey.data, reply: reply });
			}));
		}
	})

	if(data.loading) return (<RenderLoading />)

	const { survey, reply } = data;

	const params = {
		reply: reply,
		handleSelect: ()=>{},
		handleCBChange: ()=>{},
		handleItemChange: ()=>{}
	}

	return (<Paper className={classes.paper} elevation={3}>				
				<DisplayNodeHeaders title={survey.title} userId="id" /> 
	<Typography variant="subtitle2">Respuesta de: [ingresar usuario], total: {reply.score}</Typography>
				<Typography variant="body1" className={classes.nodeBody}>{survey.description}</Typography>
				{survey.elements.map((element, idx) => {
					const cp = {...params, element: element};
					
					return (
						<RenderElement key={idx} {...cp}/>						
					)
				})}		

			</Paper>
		)
}

const RenderLoading = () => {
	const classes = makeStyles(styles)();

	return (
		<Paper className={classes.paper}>
			<CircularProgress />
		</Paper>
	)
}

function getType(element) {
	let type = "text";
	if(element.type === "select") {
		type = "select";
		if(element.checkBox) {
			type = "checkbox";
		} else if (element.radioButton) {
			type = "radio"
		} else if(element.multivalued) {
			type += "-multi"
		}
	}	
	return type;
}

export const ViewSurvey = (props) => {
	const [ data, setData ] = useState({loading:true});
	const [ reply, setReply ] = useState({});
	const classes = makeStyles(styles)();

	useEffect(() => {		
		if(data.loading) {
			Axios.all([
				Axios.get(properties.server + "surveys/"+props.match.params.id),
				Axios.get(properties.server + "surveys/"+props.match.params.id + "/reply")
			]).then(Axios.spread((survey, replies) => {
				const blankReply = { items: [] };
				survey.data.elements.forEach((element, id) => {									
					blankReply.items.push({ type: getType(element), name: element.name,  value:"", values:[], error:false })});
				setReply(blankReply);
				setData({loading: false, survey: survey.data, replies: replies.data});
			  }),
			  (error)=>console.log(error));
		}	
	  });

	const handleItemChange = (e) => {
		const { name, value } = e.target;

		const copy = {...reply};

		for(let i = 0; i < copy.items.length; i++) {
			if(copy.items[i].name === name) {
				copy.items[i].value = value;
			}
		}

		setReply(copy);
	}

	const handleCBChange = (itemid, {target}) => {
		const copy = {...reply};

		const {values} = copy.items[itemid]; 
		
		const index = values.indexOf(target.value);

		if(index >= 0) {
			values.splice(index, 1);
		} else {
			values.push(target.value);
		}

		setReply(copy);
	}

	const handleSelect = ({target}) => {
		const copy = {...reply};

		copy.items.forEach((item) => {
			if(item.name === target.name) {
				item.values=[];
				target.childNodes.forEach((child) => {
					if(child.selected && child.value.length > 0) { item.values.push(child.value); }	
				})
				
			}
		});
		
		setReply(copy);
	}

	const validate = () => {
		const copy = {...reply};

		let error = false;
		
		copy.items.forEach( (item) => {
			let noValues = item.values.length === 0;
			let noValue = item.value.length === 0;
			item.error = noValue && noValues;
			error = item.error || error;
		});

		setReply(copy);

		return error;
	}

	const submit = () => {
		let isInvalid = validate();
		
		if( !isInvalid ) {
			Axios.post(properties.server + "surveys/" + props.match.params.id + "/reply",
				{replies: reply.items
				}
			).then((result)=>console.log(result));
		}
	}

	if(data.loading) {
		return (<RenderLoading />)
	}

	const { survey, replies } = data;

	const params = {
		reply: reply,
		handleSelect: handleSelect,
		handleCBChange: handleCBChange,
		handleItemChange: handleItemChange
	}

	return (
		<Paper className={classes.paper} elevation={3}>
			<DisplayNodeHeaders title={survey.title} userId="id" /> 
			<Typography variant="body1" className={classes.nodeBody}>{survey.description}</Typography>
			{survey.elements.map((element, idx) => {
				const cp = {...params, element: element};
				return (
					<RenderElement key={idx} {...cp}/>						
				)
			})}		
			<Divider className={classes.spacedDivider} />
			<Grid container>
				<Grid item sm={12} md={5} ></Grid>
				<Grid item sm={12} md={7} >
					<Button variant="contained" onClick={submit}>Responder</Button>
				</Grid>
			</Grid>
			{replies.map((userReply, key)=>{
				return (
					<Grid container>
						<Grid item sm={12} md={5} >{userReply.score}</Grid>
						<Grid item sm={12} md={7} ><RouterLink to={ "/survey/"+survey.id+"/reply/"+userReply.id }>{userReply.score}</RouterLink></Grid>
					</Grid>
				)
			})}
		</Paper>
	)		
}

//TODO: Agregar WYSIWYG

function Survey(props) {
	const classes = makeStyles(styles)();
	const blankItem = {type: "text", name: "", title: "", tip:"", values:[]};
	const blankValue = {name:"", option: "", selected: false};
	
	const expDate = new Date();
	expDate.setDate(expDate.getDate() + 4);

	const [ survey, setSurvey] = useState({ title: "", description: "", expiryDate: expDate });	
	const [ item, setItem ] = useState({...blankItem});	
	const [ items, setItems ] = useState([]);
	const [ snackbar, setSnackbar ] = useState({severity:"error", message:"", show: false});
	
	const handleChange = (event) => {
		const updatedItems = [...items];
		const { id, value } = event.target;

		const idx = id.substring(id.indexOf("-")+1);
		const name = id.substring(0, id.indexOf("-"));
		
		updatedItems[idx][name] = value;
		
		updatedItems[idx].name = "element-" + idx;
		
		setItems(updatedItems);
	}

	const handleDelete = (elementId, optionId) => {
		if(items[elementId].values.length < 3) {
			setSnackbar({severity:"error", message: "Tienen que haber al menos dos opciones", show: true});
			return;			
		}

		const copy = [...items];
		const valueCopy = [...items[elementId].values];

		valueCopy.splice(optionId, 1);

		copy[elementId].values = valueCopy;

		setItems(copy);
	}

	const handleValueChange = (itemID, optionID, target) => {
		const copy = [...items];
		
		if(copy[itemID].type === "checkbox" ) {
			copy[itemID].values[optionID].selected= !copy[itemID].values[optionID].selected;	
		} if(copy[itemID].type === "radio") {
			copy[itemID].values.map((value) => value.selected= false);
			copy[itemID].values[optionID].selected= true;	
		} else {
			target.childNodes.forEach((e,idx)=>{
				copy[itemID].values[idx].selected = e.selected;
				copy[itemID].values[idx].name = e.id;
			})
		}		
		
		setItems(copy);				
	}

	const addElement = () => {
		const element = {...item};
		
		element.type = item.type;
		
		if( item.type === 'radio' || item.type === 'checkbox') {
			element.values.push({...blankValue});
			element.values.push({...blankValue});
		}
		
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

	const handleDateChange = (e) => {
		const copy = {...survey};
		copy.expiryDate = e;

		setSurvey(copy);
	}

	const addOption = (idx) => {
		const updatedItems = [...items];
		updatedItems[idx].values.push({...blankValue});

		setItems(updatedItems);
	}

	const handleOptionChange = (event) => {
		let idSections = event.target.id.split("-");
		let idOption = idSections[idSections.length - 1];
		let idElement = idSections[idSections.length -2];
		let name = idSections[0];

		const updatedItems = [...items];

		updatedItems[idElement].values[idOption][name] = event.target.value;
		
		updatedItems[idElement].values[idOption].name = event.target.id;

		setItems(updatedItems);
	}

	const handleDeleteItem = (e) => {
		const itemNum = e.currentTarget.id.replace("delete-", "");
		const copy = [...items];

		copy.splice(itemNum, 1);

		setItems(copy);
	}

	const validateSubmit = () => {
		let invalid = false;
		invalid |= survey.title.trim().length === 0;
		invalid |= survey.description.trim().length === 0;

		if(items.length === 0) return false;

		for(let i = 0; i < items.length; i++) {
			const item = items[i];
			invalid |= item.title.trim().length === 0
			if(item.type === "radio" || item.type === "checkbox") {
				let selected = false;

				for(let j = 0; j < item.values.length; j++) {
					let value = item.values[j];
					invalid |= value.option.trim().length === 0;
					selected |= value.selected;
				}

				invalid |= (item.type === "radio" && !selected);
			}
		}

		return !invalid;
	}

	const handleSubmit = () => {
		if(!validateSubmit()) {
			return
		}

		Axios.post(properties.server + 'surveys/',
			{
				title: survey.title,
				description: survey.description,
				expiry: survey.expiryDate,
				elements: [...items]
			}
		)
			.then((result) => {
				console.log(result);
			});
	}

	return (
		<React.Fragment>
			<Paper className={classes.paper} elevation={5}>

				<SurveyGeneral handleSurvey={ handleSurvey } handleDateChange={handleDateChange} survey={ survey } />
				
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
								<IconButton id={"delete-" + idx} 
									className={classes.surveyFormControl} 
									onClick={handleDeleteItem}><DeleteIcon /></IconButton>
							</Grid>
							<Grid item md={3}>
								<TextField name={titleId}
									value={item.title}
									id={titleId}
									onChange={handleChange}
									label="Pregunta"
									/>
							</Grid>
							<Grid item container md={2}>
								<Grid item sm={10}>
									<TextField name={tipId}
										value={item.tip}
										id={tipId}
										onChange={handleChange}
										label="Informacion adicional"
										/>
								</Grid>
								<Grid item sm={2}>
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
				
				<Button onClick={handleSubmit}>Guardar</Button>
			</Paper>
			<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={snackbar.show} onClose={()=>setSnackbar({show:false})} 
						autoHideDuration={3000}>  
            	<Alert severity={snackbar.severity}>{snackbar.message}</Alert>
	        </Snackbar>
				
		</React.Fragment>
		);
} 

export default (Survey);