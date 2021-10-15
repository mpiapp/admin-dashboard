/* istanbul ignore file */
import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import BreadCrumbs from '../../../components/BreadCrumbs';
import TableData from '../../../components/TableData'
import { TableColumn } from 'react-data-table-component';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store';
import { fetchConfigStatus, postConfigStatus, removeConfigStatus, updateConfigStatus } from './configStatusSlice';
import { fetchStatus } from '../status/statusSlice';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { 
    ConfigStatusInput,
    DataRow 
} from './configStatusTypes'

import { 
    ISelectOption,
} from '../globalTypes'

const validationSchema = yup    
    .object({
        name: yup.string()
        .required("Name is required")
    })
    .required();
  

function ConfigStatus() {
      
    const dispatch = useDispatch()
    const state = useSelector((state : RootState) => state.statusConfig)
    const status = useSelector((state : RootState) => state.status)
    
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
      } = useForm<ConfigStatusInput>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const [open, setOpen] = useState(false);
    const [IdConfigStatus, setIdConfigStatus] = useState <any>(null);

    const [optionsStatus, setOptionsStatus] = useState<ISelectOption[]>([]);

    const [selectedStatus, setSelectedStatus] = useState<any>();
    const [selectedNext, setSelectedNext] = useState<ISelectOption[]>([]);

    const [errorSelectedStatus, setErrorSelectedStatus] = useState<boolean>(false);
    const [errorSelectNext, setErrorSelectNext] = useState<boolean>(false);

    const handleChangeNext = (value: any) : void => {
        setSelectedNext(value)
        setErrorSelectNext(false)
    }

    const handleChangeStatus = (value: any) : void => {
        setSelectedStatus(value)
        setErrorSelectedStatus(false)
    }

    const handleClickOpen = () : void => {
        setOpen(true);
    };

    const handleClose = () : void => {
        setOpen(false);
    };

    const proceedToArray = (value : any) => {
        let arrayCapabilities = []
        for(let i=0; i < value.length; i++) {
            arrayCapabilities.push({ id : value[i].value, name: value[i].label })
        }
        return arrayCapabilities;
    }
      
    const onSubmit = (data: ConfigStatusInput): void => {
        if(selectedStatus === undefined) {
            setErrorSelectedStatus(true)
        } else if(selectedNext.length === 0) {
            setErrorSelectNext(true)
        } else {
            if(IdConfigStatus === null) {
                let postData= {
                    name : data.name,
                    current : selectedStatus.label,
                    next: proceedToArray(selectedNext),
                }
                dispatch(postConfigStatus(postData))
            } else {
                let updateData= {
                    name : data.name,
                    current : selectedStatus.label,
                    next: proceedToArray(selectedNext),
                    id: IdConfigStatus
                }
                dispatch(updateConfigStatus(updateData)) 
            }
            reset()
            setSelectedNext([])
            setSelectedStatus({})
        }
    }

    const proceedNextToArray = (data:any) => {
        let dataArray = []
        for(let i=0; i < data.length; i++) {
            dataArray.push({ value: data[i].id, label: data[i].name })
        }
        return dataArray;
    }

    const clickUpdateConfigStatus = (row : any) => {
        let status = {
            label: row.current,
            value: row.current
        }
        setValue("name", row.name);
        setSelectedStatus(status)
        setIdConfigStatus(row.id)
        setSelectedNext(proceedNextToArray(row.next))
        setTimeout(() => {
            handleClickOpen()
        }, 100);
    }

    const columns: TableColumn<DataRow>[] = [
        {
            name: 'ID',
            selector: row => row.id,

        },
        {
            name: 'NAME',
            selector: row => row.name,
        },
        {
            name: 'CURRENT',
            selector: row => row.current,
        },
        {
            name: 'NEXT',
            cell: (row) => (
                <>
                    {
                        row.next.map((value : any, index : any) => (
                            <p key={index}>[{value.name}], </p>
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
                        onClick={() => clickUpdateConfigStatus(row)}
                    >
                        Update
                    </Button>
                    <Button onClick={() => dispatch(removeConfigStatus(row)) } variant="outlined" color="error" size="small">
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];
    
    useEffect(() => {
        handleClose()
        dispatch(fetchConfigStatus())
        dispatch(fetchStatus())
        // eslint-disable-next-line
    },  [state.create, state.update, state.remove]);

    useEffect(() => {
        const proceedOptions = () => {
            let initialData = status.data
            let dataOptions = []
            for(let i=0; i < initialData.length; i++) {
                dataOptions.push({ value: initialData[i].id, label: initialData[i].name })
            }
            setOptionsStatus(dataOptions)
        }
        proceedOptions()
    }, [status]);

    return (
        <div>
            <Box pb={2}>
                <BreadCrumbs
                    current="Config Status"
                    isPage={false}
                />
            </Box>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <h2>Master Config Status</h2>
                <Button 
                    variant="contained" color="primary" size="small" 
                    onClick={() => {
                        handleClickOpen()
                    }}
                >
                    Create New Config
                </Button> 
            </Stack>
            <Box pt={4}>
                <TableData 
                    columns={columns}
                    data={state?.data}
                    progressPending={state?.loading}
                />
            </Box>
            <Dialog 
                open={open} 
                fullWidth={true}
                maxWidth="sm"
                
            >
               <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Add New Config</DialogTitle>
                    <div className="box-modal-create">
                        <TextField
                            error={!!errors.name}
                            helperText={errors.name && errors.name.message}
                            {...register('name')}
                            margin="normal"
                            fullWidth
                            size="small"
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                         <Box pt={2}>
                            <Select
                                placeholder="Select Status"
                                value={selectedStatus}
                                isSearchable={false}
                                options={optionsStatus && optionsStatus}
                                onChange={handleChangeStatus}
                            />
                            { errorSelectedStatus ? <div className="error-p"><p>Status is required</p></div> : null }
                        </Box>
                        <Box pt={2}>
                            <Select
                                placeholder="Select Status Next"
                                value={selectedNext}
                                isMulti={true}
                                options={optionsStatus && optionsStatus}
                                onChange={handleChangeNext}
                            />
                            { errorSelectNext ? <div className="error-p"><p>Status Next is required</p></div> : null }
                        </Box>
                    </div>
                    <DialogActions>
                        <Button onClick={handleClose} color="warning">Cancel</Button>
                        <Button type="submit" >Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )   
}

export default ConfigStatus