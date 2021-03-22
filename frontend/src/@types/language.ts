import DropBoxOptions from "./dropBoxOptions";

export default interface Language extends DropBoxOptions {
    language :String;
    selected : boolean;
    key : string;
}