
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 to-indigo-50 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        <div className="text-center pt-8 pb-6 px-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">
            AI Chatbot with RAG
          </h1>
          <p className="text-muted-foreground">Sign in to access your documents and chat history</p>
        </div>
        
        <div className="px-6 pb-8">
          <SignIn 
            path="/sign-in" 
            routing="path" 
            signUpUrl="/sign-in"
            fallbackRedirectUrl="/documents" 
          />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
