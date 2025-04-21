export const questions = [
    {
        id: 'name',
        label: '1. Nombre:',
        type: 'text',
        placeholder: 'Nombre',
        size: 35,
        value: '',
        icon: 'person.svg',
    },
    {
        id: 'age',
        label: '2. Edad:',
        type: 'number',
        placeholder: 'Edad',
        size: 3,
        value: '',
        min: 0,
        max: 100,
        icon: 'age.svg',
    },
    {
        id: 'experience',
        label: '3. Años de experiencia:',
        type: 'number',
        placeholder: 'Años',
        size: 3,
        value: '',
        min: 0,
        max: 40,
        icon: 'experienceyears.svg',
    },
    {
        id: 'position',
        label: '4. Puesto actual:',
        type: 'text',
        placeholder: 'Puesto actual',
        size: 35,
        value: '',
        icon: 'position.svg',
    },
    {
        id: 'level',
        label: '5. Nivel dentro de la empresa:',
        type: 'radio',
        options: ["Director", "Gerente", "Supervisor", "Empleado"]
    },

    {
        id: 'seniority',
        label: '6. Años en la empresa:',
        type: 'number',
        placeholder: 'Años',
        size: 3,
        value: '',
        min: 0,
        max: 50,
        icon: 'seniority.svg',
    },
    {
        id: 'positions',
        label: '7. Puestos ocupados en la empresa:',
        type: 'text',
        placeholder: 'Puestos ocupados',
        size: 35,
        value: '',
        icon: 'position.svg',
    },
    {
        id: 'grade',
        label: '8. Escolaridad máxima:',
        type: 'radio',
        options: ["Maestría", "Universidad", "Bachillerato", "Secundaria"]
    },
    {
        id: 'degree',
        label: '9. Certificado/Título:',
        type: 'radio',
        options: ["Si", "No"]
    },
    {
        id: 'courses',
        label: '10. Cursos de actualización y/o entrenamiento:',
        type: 'checkbox',
        options: ["1", "2", "3", "4"]
    },
    {
        id: 'positionKnowledge',
        label: '11. ¿Conoce la descripción del puesto?:',
        type: 'radio',
        options: ["Si", "No"]
    },
    {
        id: 'functions',
        label: '12. Mencione tres funciones específicas de su puesto:',
        type: 'text',
        placeholder: 'Mencione tres funciones',
        size: 30,
        value: '',
        icon: 'function.svg',
    },
    {
        id: 'mainObjectives',
        label: '13. Indique tres objetivos a los que aporta con su rol en la empresa.',
        type: 'text',
        placeholder: 'Indique tres objetivos',
        size: 30,
        value: '',
        icon: 'goals.svg',
    },
    {
        id: 'misionKnowledge',
        label: '14. ¿Conoce la misión o razón de ser de la empresa?:',
        type: 'radio',
        options: ["Si", "No"]
    },
    {
        id: 'philosophyKnowledge',
        label: '15. ¿Conoce la filosofía de la empresa?:',
        type: 'radio',
        options: ["Si", "No"]
    },
    {
        id: 'structureKnowledge',
        label: '16. ¿Conoce la estructura de la empresa (organigrama)?:',
        type: 'radio',
        options: ["Si", "No"]
    },
    {
        id: 'historyKnowledge',
        label: '17. ¿Conoce la historia de la empresa?:',
        type: 'radio',
        options: ["Si", "No"]
    },
    {
        id: 'commitmentKnowledge',
        label: '18. ¿Conoce que compromisos tiene la empresa en el presente/futuro?:',
        type: 'radio',
        options: ["Si", "No"]
    },
    {
        id: 'objectivesKnowledge',
        label: '19. Mencione tres objetivos principales de la empresa:',
        type: 'text',
        placeholder: 'Mencione tres objetivos',
        size: 30,
        value: '',
        icon: 'goals.svg',
    },
    {
        id: 'valuesKnowledge',
        label: '20. Indique tres valores y/o normas morales/éticas de la empresa:',
        type: 'text',
        placeholder: 'Indique tres valores/normas',
        size: 30,
        value: '',
        icon: 'values.svg',
    },
    {
        id: 'servicesKnowledge',
        label: '21. Destaque los principales productos/servicios que ofrece la empresa:',
        type: 'text',
        placeholder: 'Destaque productos/servicios',
        size: 30,
        value: '',
        icon: 'services.svg',
    },
    {
        id: 'politicsKnowledge',
        label: '22. ¿Conoce las políticas/procedimientos que norman la empresa?:',
        type: 'radio',
        options: ["Si", "No"]
    },
    {
        id: 'departmentGoalsKnowledge',
        label: '23. ¿Conoce las metas de su departamento?:',
        type: 'radio',
        options: ["Si", "No"]
    },
    {
        id: 'personalGoals',
        label: '24. Indique tres objetivos personales dentro de la empresa:',
        type: 'text',
        placeholder: 'Indique tres objetivos',
        size: 30,
        value: '',
        icon: 'goals2.svg',
    },
    {
        id: 'personalGoalsTime',
        label: '24b. Indique con que frecuencia miden los objetivos personales:',
        type: 'radio',
        options: ["Anual", "Mensual", "Semanal", "Diaria"]
    },
    {
        id: 'procedureKnowledge',
        label: '25. ¿Conoce los procedimientos, metodologías e instructivos para realizar su trabajo?:',
        type: 'radio',
        options: ["Si", "No"]
    },
]