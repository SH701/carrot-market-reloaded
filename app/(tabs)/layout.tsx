import TabBar from "@/components/tab-bar";


export default function Tablayout({children}:{children:React.ReactNode}){
    return <div>
        {children}
        <TabBar/>
    </div>
}