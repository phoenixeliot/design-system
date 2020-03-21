const pureLessThanSorter = (a, b) => (a < b) ? -1 : (a > b) ? 1 : 0
const extractSortColumnDecorator = (sortFn) => (dataIndex) => (a, b) => sortFn(a[dataIndex], b[dataIndex])

const lessThanSorter = extractSortColumnDecorator(pureLessThanSorter)
const dateSorter = extractSortColumnDecorator((a, b) => {
  return pureLessThanSorter(new Date(a), new Date(b))
})

export const sampleBasicData = {
  dataSource: [
    {
      col1: 'row1 val1',
      col2: 'row1 val2',
      col3: 'row1 val3',
      col4: 'row1 val4',
      col5: 'row1 val5',
    },
    {
      col1: 'row2 val1',
      col2: 'row2 val2',
      col3: 'row2 val3',
      col4: 'row2 val4',
      col5: 'row2 val5',
    },
  ],
  columns: [
    { title: 'Column 1', dataIndex: 'col1', key: 'col1', sorter: lessThanSorter('col1') },
    { title: 'Column 2', dataIndex: 'col2', key: 'col2' },
    { title: 'Column 3', dataIndex: 'col3', key: 'col3' },
    { title: 'Column 4', dataIndex: 'col4', key: 'col4' },
    { title: 'Column 5', dataIndex: 'col5', key: 'col5' },
  ],
}

export const sampleNestedData = {
  dataSource: [
    {
      emp_no: 281328,
      first_name: 'Eishiro',
      last_name: 'Trachtenberg',
      gender: 'M',
      hire_date: '1988-01-21',
      work_experience: {
        emp_no: 281328,
        dept_no: 'd008',
        dept_name: 'Research',
        titles: [
          {
            title: 'Staff',
            from_date: '1988-01-21',
            to_date: '1996-01-21',
          },
          {
            title: 'Senior Staff',
            from_date: '1996-01-21',
            to_date: '9999-01-01',
          },
        ],
      },
      salary: [
        {
          salary: '56926',
          from_date: '1995-01-19',
          to_date: '1996-01-19',
        },
        {
          salary: '51184',
          from_date: '1989-01-20',
          to_date: '1990-01-20',
        },
        {
          salary: '60014',
          from_date: '1999-01-18',
          to_date: '2000-01-18',
        },
        {
          salary: '47619',
          from_date: '1988-01-21',
          to_date: '1989-01-20',
        },
        {
          salary: '58153',
          from_date: '1996-01-19',
          to_date: '1997-01-18',
        },
        {
          salary: '51837',
          from_date: '1990-01-20',
          to_date: '1991-01-20',
        },
        {
          salary: '56264',
          from_date: '1993-01-19',
          to_date: '1994-01-19',
        },
        {
          salary: '59706',
          from_date: '1998-01-18',
          to_date: '1999-01-18',
        },
        {
          salary: '62624',
          from_date: '2001-01-17',
          to_date: '2002-01-17',
        },
        {
          salary: '63223',
          from_date: '2002-01-17',
          to_date: '9999-01-01',
        },
        {
          salary: '57000',
          from_date: '1994-01-19',
          to_date: '1995-01-19',
        },
        {
          salary: '55221',
          from_date: '1991-01-20',
          to_date: '1992-01-20',
        },
        {
          salary: '54926',
          from_date: '1992-01-20',
          to_date: '1993-01-19',
        },
        {
          salary: '62816',
          from_date: '2000-01-18',
          to_date: '2001-01-17',
        },
        {
          salary: '58096',
          from_date: '1997-01-18',
          to_date: '1998-01-18',
        },
      ],
    },

    {
      emp_no: 12315,
      first_name: 'Firsty',
      last_name: 'Lasty',
      gender: 'X',
      hire_date: '2000-01-21',
      work_experience: {
        emp_no: 12315,
        dept_no: 'd008',
        dept_name: 'Research',
        titles: [
          {
            title: 'Staff',
            from_date: '1988-01-21',
            to_date: '1996-01-21',
          },
          {
            title: 'Senior Staff',
            from_date: '1996-01-21',
            to_date: '9999-01-01',
          },
        ],
      },
      salary: [
        {
          salary: '56926',
          from_date: '1995-01-19',
          to_date: '1996-01-19',
        },
        {
          salary: '51184',
          from_date: '1989-01-20',
          to_date: '1990-01-20',
        },
        {
          salary: '60014',
          from_date: '1999-01-18',
          to_date: '2000-01-18',
        },
        {
          salary: '47619',
          from_date: '1988-01-21',
          to_date: '1989-01-20',
        },
        {
          salary: '58153',
          from_date: '1996-01-19',
          to_date: '1997-01-18',
        },
        {
          salary: '51837',
          from_date: '1990-01-20',
          to_date: '1991-01-20',
        },
        {
          salary: '56264',
          from_date: '1993-01-19',
          to_date: '1994-01-19',
        },
        {
          salary: '59706',
          from_date: '1998-01-18',
          to_date: '1999-01-18',
        },
        {
          salary: '62624',
          from_date: '2001-01-17',
          to_date: '2002-01-17',
        },
        {
          salary: '63223',
          from_date: '2002-01-17',
          to_date: '9999-01-01',
        },
        {
          salary: '57000',
          from_date: '1994-01-19',
          to_date: '1995-01-19',
        },
        {
          salary: '55221',
          from_date: '1991-01-20',
          to_date: '1992-01-20',
        },
        {
          salary: '54926',
          from_date: '1992-01-20',
          to_date: '1993-01-19',
        },
        {
          salary: '62816',
          from_date: '2000-01-18',
          to_date: '2001-01-17',
        },
        {
          salary: '58096',
          from_date: '1997-01-18',
          to_date: '1998-01-18',
        },
      ],
    },
  ],
  columns: [
    { title: 'Employee Number', dataIndex: 'emp_no', key: 'emp_no', sorter: lessThanSorter('emp_no') },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      sorter: lessThanSorter('first_name'),
      defaultSortOrder: 'descend',
    },
    { title: 'Last Name', dataIndex: 'last_name', key: 'last_name', sorter: lessThanSorter('last_name') },
    { title: 'Gender', dataIndex: 'gender', key: 'gender', sorter: lessThanSorter('gender') },
    { title: 'Hire Date', dataIndex: 'hire_date', key: 'hire_date', sorter: dateSorter('hire_date') },
    {
      title: 'Work Experience',
      dataIndex: 'work_experience',
      key: 'work_experience',
      columns: [
        { title: 'Employee Number', dataIndex: 'emp_no', key: 'emp_no', sorter: lessThanSorter('emp_no') },
        { title: 'Department Number', dataIndex: 'dept_no', key: 'dept_no', sorter: lessThanSorter('dept_no') },
        { title: 'Department Name', dataIndex: 'dept_name', key: 'dept_name', sorter: lessThanSorter('dept_name') },
        {
          title: 'Job Titles',
          dataIndex: 'titles',
          key: 'titles',
          columns: [
            { title: 'Job Title', dataIndex: 'title', key: 'title', sorter: lessThanSorter('title') },
            { title: 'From', dataIndex: 'from_date', key: 'from_date', sorter: dateSorter('from_date') },
            { title: 'To', dataIndex: 'to_date', key: 'to_date', sorter: dateSorter('to_date') },
          ],
        },
      ],
    },
    {
      title: 'Salary History',
      dataIndex: 'salary',
      key: 'salary',
      columns: [
        { title: 'Salary', dataIndex: 'salary', key: 'salary2', sorter: lessThanSorter('salary') },
        { title: 'From', dataIndex: 'from_date', key: 'from_date', sorter: dateSorter('from_date') },
        { title: 'To', dataIndex: 'to_date', key: 'to_date', sorter: dateSorter('to_date') },
      ],
    },
  ],
}

export const sampleEntityTypesData = {
  dataSource: [
    {
      name: 'Patients',
      instances: 25723,
      last_harmonized: '2020-03-20T17:30:47-0700',
      display: 2,
    },
    {
      name: 'Person',
      instances: 1234,
      last_harmonized: '2010-03-20T17:30:47-0700',
      display: 1,
    },
  ],
  entityDefinitions: {
    // TODO: Probably change how we look these up; these keys are made up by me
    // TODO: Generalize combining entity definitions? They seem to be able to reference others...
    Patients: {
      info: {
        title: 'Patients',
        version: '0.0.1',
        baseUri: 'http://example.org/',
        description: 'Patient Model',
      },
      definitions: {
        Labs: {
          required: [],
          pii: [],
          elementRangeIndex: [],
          rangeIndex: [],
          wordLexicon: [],
          properties: {
            name: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            value: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            units: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            datetime: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
          },
        },
        Admissions: {
          required: [],
          pii: [],
          elementRangeIndex: ['AdmissionID'],
          rangeIndex: [],
          wordLexicon: [],
          properties: {
            AdmissionID: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            startdate: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            enddate: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            labs: {
              datatype: 'array',
              items: {
                $ref: '#/definitions/Labs',
              },
            },
            diagnoses: {
              datatype: 'array',
              items: {
                $ref: '#/definitions/Diagnoses',
              },
            },
          },
        },
        Patients: {
          required: [],
          pii: [],
          elementRangeIndex: ['PatientID'],
          rangeIndex: [],
          wordLexicon: [],
          properties: {
            PatientID: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            gender: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            dob: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            race: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            'marital-status': {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            language: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            percentagebelowpoverty: {
              datatype: 'decimal',
            },
            admissions: {
              datatype: 'array',
              items: {
                $ref: '#/definitions/Admissions',
              },
            },
          },
        },
        Diagnoses: {
          required: [],
          pii: [],
          elementRangeIndex: [],
          rangeIndex: [],
          wordLexicon: [],
          properties: {
            primaryDiagnosisCode: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            primaryDiagnosisDescription: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
          },
        },
      },
    },
    Person: {
      info: {
        title: 'Person',
        version: '0.0.1',
        baseUri: 'http://example.org/',
      },
      definitions: {
        Address: {
          required: [],
          pii: [],
          elementRangeIndex: [],
          rangeIndex: [],
          wordLexicon: [],
          properties: {
            street: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            state: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            zip: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
          },
        },
        Person: {
          required: [],
          pii: [],
          elementRangeIndex: [],
          rangeIndex: [],
          wordLexicon: [],
          properties: {
            ssn: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            names: {
              datatype: 'array',
              description: 'Modified',
              items: {
                $ref: '#/definitions/Name',
              },
            },
            educationLevel: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            dateOfBirth: {
              datatype: 'date',
            },
            lastUpdated: {
              datatype: 'dateTime',
            },
            address: {
              $ref: '#/definitions/Address',
            },
            emails: {
              datatype: 'array',
              items: {
                datatype: 'string',
                collation: 'http://marklogic.com/collation/codepoint',
              },
            },
          },
        },
        Name: {
          required: [],
          pii: [],
          elementRangeIndex: [],
          rangeIndex: [],
          wordLexicon: [],
          properties: {
            prefix: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            first: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            middle: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
            last: {
              datatype: 'string',
              collation: 'http://marklogic.com/collation/codepoint',
            },
          },
        },
      },
    },
  },
}