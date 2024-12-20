
export const CheckboxSetting = ({ id, label, checked, onChange }: { id: string, label: string, checked: boolean, onChange: () => void }) => (
    <span>
        <input 
            type="checkbox" 
            checked={checked}
            onChange={onChange} 
            id={id} />
        <label htmlFor={id}>{label}</label>
    </span>
);
