"use client";
import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Container, Typography, AppBar, Toolbar, Button, Box, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.js';
import { register } from '../firebase/firebase.js';
import Link from 'next/link';

const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError({ message: 'Passwords do not match' });
            setLoading(false);
            alert(error.message);
            return;
        }

        try {
            await register(email, password);
            router.push('/login'); // Redirect after successful registration
        } catch (error) {
            console.error('Registration error:', error);
            setError(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>Pantry Raid Co. - Register</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <AppBar position="fixed" color="secondary">
                <Toolbar>
                    <img src="cart.png" alt="PantryRaid Co. Logo" key="logo" style={{ marginRight: 10, height: 30 }} />
                    <Link href="/">
                        <Typography variant="h6" component="div" color="white" fontFamily="Bubblegum Sans" fontSize="3" sx={{ flexGrow: 1 }}>
                            PantryRaid Co.
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <Link href="/login">
                        <Button variant="contained" color="primary" sx={{ ml: 2, color: 'white' }}>
                            Login
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    display: 'flex',
                    backgroundImage: 'url(/background.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    width: '100vw',
                    position: 'fixed',
                    zIndex: -1,
                }}
            />

            <main>
                <Container maxWidth="md">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            height: '100vh',
                        }}
                    >
                        <Box
                            sx={{
                                width: '90%',
                                height: '60%',
                                margin: '50px 0 0 0',
                                backgroundColor: '#dd885090',
                            }}
                        >
                            <Typography
                                variant="h2"
                                color="primary"
                                component="h1"
                                mb={2}
                                fontFamily="Pacifico"
                                sx={{
                                    textDecoration: 'underline',
                                    marginTop: 3,
                                }}
                            >
                                Register
                            </Typography>
                            <form onSubmit={onSubmit}>
                                <TextField
                                    id="email"
                                    label="Email Address"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    sx={{
                                        padding: '0 90px 0 90px',
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            padding: '0 90px',
                                        },
                                    }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    type="password"
                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    sx={{
                                        padding: '0 90px 0 90px',
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            padding: '0 90px',
                                        },
                                    }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <TextField
                                    type="password"
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    sx={{
                                        padding: '0 90px 0 90px',
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            padding: '0 90px',
                                        },
                                    }}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    sx={{
                                        fontSize: '1.5rem',
                                        padding: '5px 20px',
                                        mt: 3,
                                        color: 'white',
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? 'Loading...' : 'Register'}
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </Container>
            </main>
        </ThemeProvider>
    );
};

export default Register;
