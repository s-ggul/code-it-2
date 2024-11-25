import { Button } from "@/components/ui/button";


const SubmitButton = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <Button
        type="submit"
        className="w-full h-12 bg-gray-500 hover:bg-blue-600"
        disabled={isLoading} 
      >
        회원가입하기
      </Button>
    );
  };
  
  export default SubmitButton;