export class RibbonMenuLists{
    public lists: Array<{
        name: string,
        RegistrationId: number
    }> = new Array();

    constructor(){
        this.lists.push({name: "CustomList", RegistrationId: 100})
        this.lists.push({name: "DocumentLibrary", RegistrationId: 101})
        this.lists.push({name: "Survey List", RegistrationId: 102})
        this.lists.push({name: "Links List", RegistrationId: 103})
        this.lists.push({name: "Annoucemments List", RegistrationId: 104})
        this.lists.push({name: "Contacts list", RegistrationId: 105})
        this.lists.push({name: "Calendar list", RegistrationId: 106})
        this.lists.push({name: "Tasks list", RegistrationId: 107})
        this.lists.push({name: "Discussion Board", RegistrationId: 108})
        this.lists.push({name: "PictureLibrary", RegistrationId: 109})
        this.lists.push({name: "User information list", RegistrationId: 112})
        this.lists.push({name: "Custom Grid for a list", RegistrationId: 120})
        this.lists.push({name: "Grantt Tasks list", RegistrationId: 150})
        this.lists.push({name: "TasksWithTimelineAndHierarchy", RegistrationId: 171})
        this.lists.push({name: "Resources list", RegistrationId: 402})
        this.lists.push({name: "Whereabouts list", RegistrationId: 403})
        this.lists.push({name: "CallTrackingPhoneMemo", RegistrationId: 404})
        this.lists.push({name: "Circulation List", RegistrationId: 405})
        this.lists.push({name: "Timecard list", RegistrationId: 420})
        this.lists.push({name: "Holidays list", RegistrationId: 421})
        this.lists.push({name: "Externals list", RegistrationId: 600})
        this.lists.push({name: "IssueTracking list", RegistrationId: 1100})
    }
}