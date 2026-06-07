import '../css/App.css'

function LoadingSpinner(){
    return(
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="w-[60px] h-[60px] border-[6px] border-white/20 border-t-sky-400 rounded-full animate-spin"></div>
        </div>
    );
}
export default LoadingSpinner;