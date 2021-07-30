import Setting from './Setting';
import AddSetting from './AddSetting';

function Settings({ assignees, categories, getSettings }) {
    return (
        <div>
            Assignees:
            {assignees.map((assignee) => (
                <Setting key={assignee.id} getSettings={getSettings} setting={assignee} settingType="assignees" />
            ))}
            <AddSetting getSettings={getSettings} settingType="assignees" />
            Categories:
            {categories.map((category) => (
                <Setting key={category.id} getSettings={getSettings} setting={category} settingType="categories" />
            ))}
            <AddSetting getSettings={getSettings} settingType="categories" />
        </div>
    )
}

export default Settings
