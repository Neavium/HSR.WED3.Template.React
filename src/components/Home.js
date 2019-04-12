// @flow

import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from 'semantic-ui-react'

export type Props = {
    isAuthenticated: boolean,
}

const Home = ({isAuthenticated}: Props) => (
    <div>
        {isAuthenticated
            ? <div>
                <p>Willkommen zurück!</p>
                <Button as={Link} content="Zum Dashboard" to={ "/dashboard"}/>
            </div>
            : <div>
                <Link to={'/login'}>Einloggen</Link>
                <p>Falls Sie noch keinen Account besitzen können Sie sich hier registrieren:</p>
                <Link to={'/signup'}>Registrieren</Link>
            </div>

        }
    </div>
)

export default Home
