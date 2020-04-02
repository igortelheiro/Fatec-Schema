import React from 'react'
import AppButton from '../AppBar/app-button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker } from '@material-ui/pickers'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import moment from 'moment'
import MsgDialog from '../Tools/msgDialog'
import Filter from 'bad-words'
import RouterButton from '../Tools/routerButton'
import Badwords from './badwords'

import AccountCircle from '@material-ui/icons/AccountCircle'
import Email from '@material-ui/icons/Mail'
import Cake from '@material-ui/icons/Cake'
import Gender from '@material-ui/icons/Wc'
import Lock from '@material-ui/icons/Lock'

//import EyeIcon from '@material-ui/icons/Visibility';

import Login from './login';

export default class Register extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      data: [],
      username: '',
      email: '',
      birthday: null,
      gender: '',
      password: '',
      passwordcheck: '',
      error: null
    }
  }

  onClickSubmit = e => {
    //Prevent from refreshing the page
    e.preventDefault()
    
    //Get User´s Age Data
    const validName = this.isNameValid()
    const validEmail = this.isEmailValid()
    const validAge = this.isAgeValid()
    const validGender = this.isGenderChecked()
    const validPassW = this.isPasswordValid()
    
    if (validName && validEmail && validAge && validGender && validPassW) {
      //Send Data
      this.state.data.push({ user: {
        username: validName,
        email: validEmail,
        birthday: validAge,
        gender: validGender,
        password: validPassW
      }})

      //Erase Fields
      this.setState({
        username: '',
        email: '',
        birthday: null,
        gender: '',
        password: '',
        passwordcheck: '',
        error: null
      })
      console.log(this.state.data)
    }
  }

  //OnChange Handlers
            //Handle Fields Filling
            onTextChange = e => {
              // SetState com nome dinamico
              
              const {id, value} = e.target
              this.setState({[id]: value})
            }

            //Handle Date Select      TODO: MIX WITH ONTEXTCHANGE
            onDateChange = date => {
              this.setState({ birthday: date })
            }

            //Handle Gender Select      TODO: MIX WITH ONTEXTCHANGE
            onGenderSelect = opt => {
              
              let value = opt.target.value
              this.setState({ gender: value })
            }


  //Recieve´s the choosen date and create´s an object with estructured data
  renderBirthDate = () => {
    
    let birthDate = moment(this.state.birthday)

    let birthData = {
      dia: birthDate.date(),
      mes: birthDate.month() + 1,
      ano: birthDate.year(),
      idade: null
    }

    //Calc User Age
    let calcAge = () => {
      let today = new Date()
      let age = today.getFullYear() - birthData.ano
      let m = today.getMonth() - birthData.mes
      if (m < 0 || (m === 0 && today.getDay() < birthData.dia)) {
        age = age - 1
      }
      return age
    }; 
    
    //Add User Age to birthData
    let userAge = calcAge()
    birthData.idade = userAge

    return birthData
  }


  //Submit Validators
            //Validate Username
            isNameValid = () => {
              const nameField = this.state.username.trim().toLowerCase()
              const validName = /^[A-Za-z]\w{3,11}$/

              //Checking minimum letters
              if (nameField.match(validName)) {
                //Calling BadWords Filter
                const filter = new Filter({ placeHolder: 'x' })
                //Adding new BadWords
                filter.addWords(...Badwords)
                //Cleaning the original input
                const checkedName = filter.clean(nameField)

                //Checking badWords
                if (checkedName.search('x') < 0) return checkedName
                else {
                  this.onError('Username inválido', 'Palavras maliciosas não são permitidas como Username')
                  document.querySelector('#username').focus()
                  return false
                }
              } else {
                this.onError('Username inválido', 'Favor inserir um Username com 4 a 12 caracteres, começando com uma letra')
                document.querySelector('#username').focus()
                return false
              }
            }

            //Validate Email
            isEmailValid = () => {
              let email = this.state.email
              let isTestOK = /\S+@\S+\.\S+/.test(email)

              if (isTestOK) return email
              else {
                this.onError('Email inválido', 'Favor inserir um formato de email válido.')
                document.querySelector('#email').focus()
                return false
              }
            }

            //Check Minimun Age
            isAgeValid = () => {
              let birthData = this.renderBirthDate()

              if (birthData.idade >= 8) return birthData
              else {
                this.onError('Idade inválida', 'A idade mínima para o uso do aplicativo é de 8 anos.')
                document.querySelector('#birthday').focus()
                return false
              }
            }

            //Check Gender Selection
            isGenderChecked = () => {
              //Receive Gender Option
              let genderOpt = this.state.gender
              //Check if the option is null
              let isGenderOK = genderOpt === null || genderOpt === '' ? false : true

              if (isGenderOK) return genderOpt
              else {
                this.onError('Formulário Incompleto', 'Favor inserir um gênero válido')
                document.querySelector('#gender').focus()
                return false
              }
            }

            //Validate Password
            isPasswordValid = () => {
              const passW = this.state.password
              const passWCheck = this.state.passwordcheck
              const validPassW = /^[A-Za-z]\w{7,15}$/
              
              if (passW.match(validPassW)) {
                if (passW === passWCheck) return passW
                else {
                  this.onError('Erro de validação', 'Suas senhas devem coincidir')
                  document.querySelector('#passwordcheck').focus()
                  return false
                }
              }
              else {
                  this.onError('Erro de validação', 'Sua senha deve ter de 8 a 16 caracteres com pelo menos um número, começando com uma letra.')
                  document.querySelector('#password').focus()
                  return false
              }
            }

  //Open Error Dialog
  onError = (title, description) => {
    this.setState({ error: <MsgDialog title={title} message={description} changeStatus={this.endError}/> })
  }
  //Close Error Dialog
  endError = () => {
    this.setState({ error: null })
  }

  render(){
    return (
      <div id='registerField' style={{margin: 4}}>
        <h2>Está na hora de por você no jogo!</h2>

        <form onSubmit={() => {this.onClickSubmit(event)}}>
          <div style={{display: 'inline', margin: 15}}>


            
            <Grid container spacing={6} direction='row' justify='flex-start' alignItems='center'>
              {/* USERNAME FIELD */}
              <Grid item xs={1}>
                <AccountCircle />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  autoFocus={true}
                  required
                  helperText='Mínimo 4 caracteres'
                  id="username" value={this.state.username}
                  label="username" onChange={() => this.onTextChange(event)}
                />
              </Grid>


              {/* EMAIL FIELD */}
              <Grid item xs={1}>
                <Email />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  id="email" value={this.state.email}
                  label="email" onChange={() => this.onTextChange(event)}
                />
              </Grid>
            </Grid>


            
            <Grid container spacing={6} direction='row' justify='flex-start' alignItems='center'>
              {/* BIRTHDAY FIELD */}
              <Grid item xs={1}>
                <Cake />
              </Grid>
              <Grid item xs={4}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    disableFuture
                    required
                    autoOk={true}
                    //minDate={Date(01-01-2000)}
                    helperText='Idade mínima 8 anos'
                    id="birthday"
                    openTo="year"
                    format="dd/MM/yyyy" 
                    label="data de nascimento"
                    views={["year", "month", "date"]}
                    value={this.state.birthday}
                    onChange={date => this.onDateChange(date)}
                    //shouldDisableDate={() => this.disableInvalidDate()}
                    //error={this.isAgeValid ? {} : 'Você não possui idade suficiente para este serviço!'} 
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            

              {/* GENDER SELECT FIELD */}
              <Grid item xs={1}>
                <Gender />
              </Grid>
              <Grid item xs={4}>           
                  <Select
                    style={{paddingTop:16, width: 195}}
                    displayEmpty
                    name='gender'
                    id="gender"
                    value={this.state.gender}
                    onChange={(opt) => this.onGenderSelect(opt)}
                  >
                    <MenuItem value={''} disabled>Gênero</MenuItem>
                    <MenuItem value={'M'}>Masculino</MenuItem>
                    <MenuItem value={'F'}>Feminino</MenuItem>
                    <MenuItem value={'O'}>Outro</MenuItem>
                    <MenuItem value={'ND'}>Prefiro não informar</MenuItem>
                  </Select>
              </Grid>
            </Grid>


            
            <Grid container spacing={6} direction='row' justify='flex-start' alignItems='center'>
              {/* PASSWORD FIELD */}
              <Grid item xs={1}>
                <Lock />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  helperText='Mínimo 8 caracteres'
                  id="password" type='password' value={this.state.password}
                  label="senha" onChange={() => this.onTextChange(event)}
                  //trailingicon={<i className='material-icons'>visibility</i>}   {{{{{{{TODO}}}}}}}
                />
              </Grid>
                     

              {/* CONFIRM PASSWORD FIELD */}
              <Grid item xs={1}>
                <Lock />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  helperText='As senhas devem coincidir'
                  id="passwordcheck" type='password' value={this.state.passwordcheck}
                  label="confirmar senha" onChange={() => this.onTextChange(event)}
                  //trailingicon={<i className='material-icons'>visibility</i>}   {{{{{{{TODO}}}}}}}
                />
              </Grid>
            </Grid>
          </div>


          {/* SUBMIT BUTTON */}
          <div>
            <AppButton type="submit" size="large">
                CADASTRAR-SE
            </AppButton>
          </div>
        </form>


        {/* OPEN ERROR DIALOG */}
        <div>{ this.state.error }</div>
        
        <br />

        <RouterButton mainApp={this.props.mainApp} txt={"Já possui uma conta?"} page={Login} />
      </div>
    )
  }
}