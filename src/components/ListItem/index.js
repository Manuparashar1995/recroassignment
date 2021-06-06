import React from 'react'
import '../ListItem/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Index(props) {
    return (
        <div className='listItem'>
            <div className="card">
                <div key={props.task.id}>
                    <h4><b>{props.task.title}</b></h4>
                    <p>{props.task.body}</p>
                </div>
            </div>
        </div>
    )
}
