import passport from 'passport';

const UserController = {
    googleLogin: passport.authenticate('google', { scope: ['profile', 'email'] }),

    googleCallback: passport.authenticate('google', { failureRedirect: '/login' }),

    // Optional: If you want to handle the callback manually
    // googleCallback: (req, res, next) => {
    //     passport.authenticate('google', (err, user) => {
    //         if (err) { return next(err); }
    //         if (!user) { return res.redirect('/login'); }
    //         req.logIn(user, (err) => {
    //             if (err) { return next(err); }
    //             return res.redirect('/'); // Redirect to home page after successful authentication
    //         });
    //     })(req, res, next);
    // }
};

export default UserController;
