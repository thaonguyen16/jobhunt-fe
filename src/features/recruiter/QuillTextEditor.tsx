import { useEffect, useRef } from "react";
import { useQuill } from "react-quilljs"; // Using useQuill from react-quilljs
import "quill/dist/quill.snow.css"; // Import Quill styles

type QuillTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export default function QuillTextEditor({
  value,
  onChange,
  onBlur,
}: QuillTextEditorProps) {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ size: ["small", "normal", "large", "huge"] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const { quill, quillRef } = useQuill({ modules });
  const isMounted = useRef(false); // Track if component is mounted

  useEffect(() => {
    if (quill) {
      if (!isMounted.current) {
        // Set initial value only on mount
        quill.root.innerHTML = value || "";
        isMounted.current = true; // Mark as mounted
      }

      // On text change, pass the value back to the form
      quill.on("text-change", () => {
        if (quill.root.innerHTML === "<p><br></p>") {
          onChange(""); // Send empty string if editor is empty
          return;
        }
        onChange(quill.root.innerHTML); // Send HTML content as value
      });

      // Handle blur event to inform React Hook Form
      quill.root.addEventListener("blur", onBlur);
    }

    // Cleanup listeners on unmount
    return () => {
      if (quill) {
        quill.off("text-change");
        quill.root.removeEventListener("blur", onBlur);
      }
    };
  }, [quill, onChange, onBlur, value]);

  return (
    <div>
      <div ref={quillRef} style={{ height: "200px" }} />
    </div>
  );
}
