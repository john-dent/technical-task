const Setting = ({ getSettings, setting, settingType }) => {
    // Delete Setting
    const deleteSetting = async () => {
        await fetch(`http://localhost:5000/${settingType}/${setting.id}`, {
        method: 'DELETE',
        })
    }
    
    const onSubmit = (e) => {
        e.preventDefault()

        deleteSetting()
        getSettings()
      }
    return (
        <form className='form' onSubmit={onSubmit}>
            <div className='form-control-settings'>
                <input type="text" value={setting.name} readOnly /><input type='submit' value='Remove' className='btn-settings-remove' />
            </div>
        </form>
    )
}

export default Setting
