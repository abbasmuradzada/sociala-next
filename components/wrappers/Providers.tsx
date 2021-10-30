import { AuthProvider } from "../../context";

export const AuthProviderWrapper = ({ children }: any) => {
    <AuthProvider>
        {children}
    </AuthProvider>
}