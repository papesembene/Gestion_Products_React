
export function Input({placeholder,value,onChange}) {
    return  <input type="text" className="form-control"
                 placeholder={placeholder}
                value={value}
                onChange={(e)=>onChange(e.target.value)}
                />
          
}