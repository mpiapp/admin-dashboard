import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import BreadCrumbs from '../../../components/BreadCrumbs';
import TableData from '../../../components/TableData'
import { TableColumn } from 'react-data-table-component';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Select from 'react-select'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store';
import { 
    onGetCompanyType,  
    onCreateCompanyType,
    onUpdateCompanyType,
    onRemoveCompanyType 
} from './action/companyTypeAction'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { 
    CompanyTypeInput,
    DataRowCompanyType 
} from './companyTypeTypes'

import { 
    ISelectOption,
} from '../globalTypes'
import { onGetLegalDocument } from '../legal_document/action/legalDocumentAction';

const validationSchema = yup    
    .object({
        name: yup.string()
        .required("Name is required")
    }) 

    
function CompanyType() {
      
    const companytype = useSelector((state : RootState) => state.companytype)
    const legaldocument = useSelector((statelegal : RootState) => statelegal.legaldocument)
    
    const [open, setOpen] = useState(false);
    const [IdCapability, setIdCompanyType] = useState <any>(null);

    const [options, setOptions] = useState<ISelectOption[]>([]);
    const [selectedOption, setSelectedOption] = useState<ISelectOption[]>([]);
    const [errorSelect, setErrorSelect] = useState<boolean>(false);

    /* istanbul ignore next */
    const handleChange = (value: any) : void => {
        setSelectedOption(value)
    }

    const handleClickOpen = () : void => {
        setOpen(true);
    };

    const handleClose = () : void => {
        setOpen(false);
        setSelectedOption([])
    };

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
      } = useForm<CompanyTypeInput>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    /* istanbul ignore next */
    const proceedToArray = (value : any) => {
        let arrayCapabilities = []
        for(let element of value) {
            arrayCapabilities.push(element.value)
        }
        return arrayCapabilities;
    }
      
    /* istanbul ignore next */
    const onSubmit = (data: CompanyTypeInput): void => {
        if(selectedOption.length === 0) {
            setErrorSelect(true)
        } else {
            if(IdCapability === null) {
                let postData= {
                    name : data.name,
                    legal_doc: proceedToArray(selectedOption),
                }
                onCreateCompanyType(postData)
                reset()
            } else {
                let updateData= {
                    name : data.name,
                    legal_doc: proceedToArray(selectedOption),
                    id: IdCapability
                }
                onUpdateCompanyType(updateData)
                reset()
            }
        }
    }

    /* istanbul ignore next */
    const columns: TableColumn<DataRowCompanyType>[] = [
        {
            name: 'ID',
            selector: row => row.id,

        },
        {
            name: 'NAME',
            selector: row => row.name,
        },
        {
            name: 'LEGAL DOCUMENT',
            cell: (row) => (
                <>
                    {
                        row.legal_doc.map((value : any, index : any) => (
                            <p key={index}>{value}, </p>
                        ))
                    }
                </>
            ),
        },
        {
            name: 'ACTION',
            width: '200px',
            cell: (row) => (
                <Stack direction="row" spacing={2}>
                    <Button 
                        variant="outlined" color="primary" size="small"
                        onClick={() => {
                            setValue("name", row.name);
                            setIdCompanyType(row.id)
                            setSelectedOption(row.legal_doc)
                            setTimeout(() => {
                                handleClickOpen()
                            }, 100);
                        }}
                    >
                        Update
                    </Button>
                    <Button onClick={() => onRemoveCompanyType(row) } variant="outlined" color="error" size="small">
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];
    
    useEffect(() => {
        handleClose()
        onGetCompanyType()
        onGetLegalDocument()
        setSelectedOption([])
        setIdCompanyType(null)
        // eslint-disable-next-line
    },  [companytype.create, companytype.update, companytype.remove]);


    /* istanbul ignore next */
    useEffect(() => {
        const proceedOptions = () => {
            let initialDataLegalDoc = legaldocument.data
            let dataOptionsLegalDoc = []
            for(let element of initialDataLegalDoc) {
                dataOptionsLegalDoc.push({ value: element.id, label: element.title })
            }
            setOptions(dataOptionsLegalDoc)
        }
        proceedOptions()
    }, [legaldocument]);

    return (
        <div>
            <Box pb={2}>
                <BreadCrumbs
                    current="Company Type"
                    isPage={false}
                />
            </Box>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <h2>Master Company Type</h2>
                <Button 
                    variant="contained" color="primary" size="small" 
                    onClick={() => {
                        handleClickOpen()
                        reset()
                    }}
                >
                    Create New Type
                </Button> 
            </Stack>
            <Box pt={4}>
                <TableData 
                    columns={columns}
                    data={companytype?.data}
                    progressPending={companytype?.loading}
                />
            </Box>
            <Dialog 
                open={open} 
                fullWidth={true}
                maxWidth="sm"
                
            >
                <form onSubmit={handleSubmit(onSubmit)} >
                    <DialogTitle>Add New Type</DialogTitle>
                    <div className="box-modal-create">
                        <TextField
                            /* istanbul ignore next */
                            error={!!errors.name}
                            /* istanbul ignore next */
                            helperText={errors.name && errors.name.message}
                            {...register('name')}
                            margin="normal"
                            size="small"
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus 
                        />
                        <Box pt={2}>
                            <Select
                                placeholder="Select Legal Doc"
                                value={selectedOption}
                                isMulti={true}
                                options={options}
                                onChange={handleChange}
                            />
                            { 
                            /* istanbul ignore next */
                            errorSelect ? <div className="error-p"><p>Legal Document is required</p></div> : null }
                        </Box>
                    </div>
                    <DialogActions>
                        <Button onClick={handleClose} color="warning">Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )   
} 

export default CompanyType
