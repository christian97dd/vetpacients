import React, { useState, useEffect } from 'react';

const Cita = ({ cita, index, eliminarCita }) => {
    return(
        <div className="cita">
            <p>Mascota: <span>{cita.mascota}</span></p>
            <p>Dueño: <span>{cita.propietario}</span></p>
            <p>Fecha: <span>{cita.fecha}</span></p>
            <p>Hora: <span>{cita.hora}</span></p>
            <p>Síntomas: <span>{cita.sintomas}</span></p>
            <button
                onClick={() => eliminarCita(index) }
                type="button" className="button eliminar u-full-width">Eliminar X</button>
        </div>
    );
}

const Formulario = ({ crearCita }) => {

    const stateInicial = {
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
    }
    // cita = state actual
    // setCita = fn para cambiar el state
    const [cita, setCita] = useState(stateInicial);
    // actualiza el state
    const handleChangeState = (e) => {
        setCita ({
            ...cita,
            [e.target.name]: e.target.value // value es lo que escribis en el input, name es el input
        })
    }
    // pasamos la cita al componente principal
    const handleSubmitForm = (e) =>{
        e.preventDefault();
        // pasar la cita hacia el componente principal
        crearCita(cita)
        // reiniciar el state (reiniciar el form) 
        setCita(stateInicial);
    }

    return (
        <>
            <h2>Crear Cita</h2>

            <form onSubmit={handleSubmitForm}>
                <label>Nombre Mascota</label>
                <input 
                type="text" 
                name="mascota"
                className="u-full-width" 
                placeholder="Nombre Mascota" 
                onChange={handleChangeState}
                value={cita.mascota}
                />

                <label>Nombre Dueño</label>
                <input 
                type="text" 
                name="propietario"
                className="u-full-width"  
                placeholder="Nombre Dueño de la Mascota" 
                onChange={handleChangeState}
                value={cita.propietario}
                />

                <label>Fecha</label>
                <input 
                type="date" 
                className="u-full-width"
                name="fecha"
                onChange={handleChangeState}
                value={cita.fecha}
                />               

                <label>Hora</label>
                <input 
                type="time" 
                className="u-full-width"
                name="hora" 
                onChange={handleChangeState}
                value={cita.hora}
                />

                <label>Sintomas</label>
                <textarea 
                className="u-full-width"
                name="sintomas"
                onChange={handleChangeState}
                value={cita.sintomas}
                ></textarea>

                <button type="submit" className="button-primary u-full-width">Agregar</button>
            </form>
        </>
    );
}

const App = () => {

    // cargar las citas de localsotarge como state inicial
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(!citasIniciales) {
        citasIniciales = [];
    }
    // useState retorna 2 funciones
    // el state actual = this.state;
    // el segundo, es la funcion que actualiza el state, this.setState();
    const [citas, setCita] = useState(citasIniciales);
    // agregar las nuevas citas al state 
    const crearCita = (cita) => {
        // tomar una copia del state y agregar el nuevo cliente
        const nuevasCitas = [...citas, cita];
        // almacenamos en el state
        setCita(nuevasCitas);
        
    }

    // elimina las citas del state
    const eliminarCita = (index) => {
        const nuevasCitas = [...citas];
        nuevasCitas.splice(index, 1); // splice borra elementos (borra el index, y 1 solo)
        setCita(nuevasCitas)
    }

    useEffect(
        () => {
            let citasIniciales = JSON.parse(localStorage.getItem('citas'));
            if(citasIniciales) {
                localStorage.setItem('citas', JSON.stringify(citas));
            } else {
                localStorage.setItem('citas', JSON.stringify([]));
            }
        }, [citas] )

    // cargar condicionalmente un titulo

    const titulo = Object.keys(citas).length === 0 ? 'No Hay Citas' : 'Administrar Las Citas Aqui'; // object.keys muestra los keys

    return(
        <>
            <h1>Administrador de Pacientes</h1>
            <div className="container">
                <div className="row">
                    <div className="one-half column">
                        <Formulario
                            crearCita={crearCita}
                        />
                    </div>
                    <div className="one-half column">
                        <h2>{titulo}</h2>
                        {citas.map((cita, index) => (
                            <Cita 
                                key={index}
                                index={index}
                                cita={cita}
                                eliminarCita={eliminarCita}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;