import Setting from './Setting';
import AddSetting from './AddSetting';

function Settings({ asignees, categories, getSettings }) {
    return (
        <div>
            Asignees:
            {asignees.map((asignee) => (
                <Setting key={asignee.id} getSettings={getSettings} setting={asignee} settingType="asignees" />
            ))}
            <AddSetting getSettings={getSettings} settingType="asignees" />
            Categories:
            {categories.map((category) => (
                <Setting key={category.id} getSettings={getSettings} setting={category} settingType="categories" />
            ))}
            <AddSetting getSettings={getSettings} settingType="categories" />
        </div>
    )
}

export default Settings
