import {motion} from 'framer-motion';
import {Controller, useForm} from 'react-hook-form';
import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import _ from '@lodash';
import {useDispatch} from 'react-redux';
import {postLogin} from 'app/api-conn/User';
import {useHistory} from 'react-router';
import {login} from '../../store/auth/authorizationSlice';
import {logUser} from '../../store/user/userSlice';

const useStyles = makeStyles((theme) => ({
    root: {},
}));

const defaultValues = {
    username: '',
    password: '',
    rememberMe: true,
};

function LoginPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const {control, formState, handleSubmit} = useForm({
        mode: 'onChange',
        defaultValues,
    });

    const {isValid, dirtyFields, errors} = formState;

    function onSubmit(data) {
        postLogin(JSON.stringify(data))
            .then((response) => {
                dispatch(
                    login({
                        token: response.data.token,
                        refreshToken: response.data.tokenRefresh,
                    })
                );
                dispatch(logUser());
                history.push('/dashboard');
            })
            .catch((error) => console.log(error.message));
    }

    return (
        <div className={clsx(classes.root, 'flex flex-col flex-auto items-center justify-center p-16 sm:p-32')}>
            <div className="flex flex-col items-center justify-center w-full">
                <motion.div initial={{opacity: 0, scale: 0.6}} animate={{opacity: 1, scale: 1}}>
                    <Card className="w-full max-w-384">
                        <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
                            <img className="w-128 m-32" src={`${process.env.PUBLIC_URL}/assets/images/logos/subzero.png`} alt="logo" />

                            <Typography variant="h6" className="mt-16 mb-24 font-semibold text-18 sm:text-24">
                                Login to your account
                            </Typography>

                            <form name="loginForm" noValidate className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
                                <Controller
                                    name="username"
                                    control={control}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            className="mb-16"
                                            label="Username"
                                            autoFocus
                                            type="text"
                                            error={!!errors.email}
                                            helperText={errors?.email?.message}
                                            variant="outlined"
                                            required
                                            fullWidth
                                        />
                                    )}
                                />
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            className="mb-16"
                                            label="Password"
                                            type="password"
                                            error={!!errors.password}
                                            helperText={errors?.password?.message}
                                            variant="outlined"
                                            required
                                            fullWidth
                                        />
                                    )}
                                />

                                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                                    <Controller
                                        name="rememberMe"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl>
                                                <FormControlLabel label="Remember Me" control={<Checkbox {...field} />} />
                                            </FormControl>
                                        )}
                                    />
                                </div>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="w-224 mx-auto mt-16"
                                    aria-label="LOG IN"
                                    disabled={_.isEmpty(dirtyFields) || !isValid}
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

export default LoginPage;
