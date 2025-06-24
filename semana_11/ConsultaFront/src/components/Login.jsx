import  { useState } from 'react'

export default function Login({setEstaLogueado}) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    
    const handleOnClick = ()=>{
        if(email === 'admin' &&  pass === '123'){
            setEstaLogueado(true)
        }else{
            alert('Email y/o password no válidos!')
        }
    }

    const handleOnChangePass = (e) => setPass(e.target.value)

    return (
        <div className='card d-flex container' style={{ width: 300, height:250}}>
            <div className="form-group text-start">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingrese email" />
            </div>
            <div className="form-group text-start">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input onChange={handleOnChangePass} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button onClick={handleOnClick} type="button" className="btn btn-primary mt-3">Ingresar</button>
        </div>

    )
}
