import { MessageDisplay } from "../App"

interface TextFileProps {
      Msg: MessageDisplay
}

function TextFile(props: TextFileProps) {
      return <div>
            {props.Msg.Text}
      </div>
}

export default TextFile