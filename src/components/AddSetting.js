import { useState } from 'react';

const Setting = ({ settingType, getSettings }) => {
    const [setting, setSetting] = useState('')

    const addSetting = async () => {
        const newSetting = {
            name: setting
        }
        console.log(newSetting)
        const res = await fetch(`http://localhost:5000/${settingType}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(newSetting),
        })

        await res.json()

        getSettings()
    }

    const onSubmit = (e) => {
        e.preventDefault()
    
        if (!setting) {
          alert('Please type a setting name.')
          return
        }
    
        addSetting()
        getSettings()
        setSetting('')
      }

    return (
        <form className='form' onSubmit={onSubmit}>
            <div className='form-control-settings'>
                <input type="text" value={setting} onChange={(e) => setSetting(e.target.value)} placeholder={'Add Setting'} /><input type='submit' value='Add' className='btn-settings-add' />
            </div>
        </form>
    )
}

export default Setting
