import { FC } from "react";

interface Props {
    buttonName: string;
}

const Form: FC<Props> = (props) => {
    return (
        <div>
            <form>
                <input type="text" placeholder="Title" required />
                <input type="text" placeholder="Content (Optional)" />
                <input type="text" placeholder="Image URL (Optional)" />
                <button type="submit">{props.buttonName}</button>
            </form>
        </div>
    );
};

export default Form;
