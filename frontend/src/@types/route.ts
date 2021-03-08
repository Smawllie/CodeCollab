export default interface Routes {
    path:string;
    name:string;
    exact : boolean;
    component : any;
    props?:any;
}