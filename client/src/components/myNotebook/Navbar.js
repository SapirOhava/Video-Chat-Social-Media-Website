
import { Navbar ,Nav } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import React, { Fragment, useEffect } from 'react';
export default function NavbarComponent({profile}) {
    return (
        <Fragment>
        <div bg="light" expanded="sm">
            <Navbar.Brand as={Link} to="/myNotebook">
               <h2>    {profile.user.name}'s File's</h2>
            </Navbar.Brand>
        </div>
        </Fragment>
    )
}
