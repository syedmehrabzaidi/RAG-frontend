
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent mb-2">
            PDF Chat
          </h1>
          <p className="text-muted-foreground">Sign in to access your documents and chat history</p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <SignIn routing="path" path="/sign-in" redirectUrl="/documents" />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
