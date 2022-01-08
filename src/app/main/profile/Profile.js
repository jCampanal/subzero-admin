import withProtectedRoute from 'app/fuse-layouts/ProtectedRoute/ProtectedRoute'
import React from 'react'
import ProfileForm from './ProfileForm'

const profile = () => {
    const [user, setUser] = useState(initialState)
    return (
        <ProfileForm user={user} />
    )
}

export default withProtectedRoute( profile)
