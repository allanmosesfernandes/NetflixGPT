function convertFirebaseErrorToStrings(errorMessage) {
    console.log(errorMessage)
    switch (errorMessage) {
        case 'auth/email-already-in-use':
            return 'Email already exists';
        case 'OPERATION_NOT_ALLOWED':
            return 'This operation is not allowed. Please contact support.';
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            return 'Too many attempts. Please try again later.';
        case 'INVALID_EMAIL':
            return 'The email address is not valid.';
        case 'USER_DISABLED':
            return 'This user account has been disabled.';
        case 'USER_NOT_FOUND':
            return 'No user found with this email.';
        case 'INVALID_PASSWORD':
            return 'The password is invalid. Please try again.';
        // Add any additional Firebase error codes as needed
        default:
            return 'An unexpected error occurred. Please try again.';
    }
}

export { convertFirebaseErrorToStrings }