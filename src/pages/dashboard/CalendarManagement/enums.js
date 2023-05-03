export const EEventTypes = {
    Default: 1,
    Exam: 2,
    Meet: 3,
    Work: 4,
}

export function getEventTypes() {
    return [
        { key: EEventTypes.Default.toString(), text: "Varsayılan", value: EEventTypes.Default },
        { key: EEventTypes.Exam.toString(), text: "Sınav", value: EEventTypes.Exam },
        { key: EEventTypes.Meet.toString(), text: "Toplantı", value: EEventTypes.Meet },
        { key: EEventTypes.Work.toString(), text: "Çalışma Saati", value: EEventTypes.Work }
    ]
}
