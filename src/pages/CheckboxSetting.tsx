
export const CheckboxSetting = ({ id, label, checked, onChange }: { id: string, label: string, checked: boolean, onChange: () => void }) => (
    <div style={{flexBasis: "content"}}>
        <input 
            type="checkbox" 
            checked={checked}
            onChange={onChange} 
            id={id} />
        <label htmlFor={id}>{label}</label>
    </div>
);
