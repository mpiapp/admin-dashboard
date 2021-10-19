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
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store';
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
import { onGetStatus } from '../status/action/statusAction';
import { 
    onGetConfigStatus, 
    onCreateConfigStatus, 
    onRemoveConfigStatus,
    onUpdateConfigStatus
 } from './action/configStatusAction';

const validationSchema = yup    
    .object({
        name: yup.string()
        .required("Name is required")
    })
    .required();
  

function ConfigStatus() {
      
    const statusConfig = useSelector((state : RootState) => state.statusConfig)
    const status = useSelector((statestatus : RootState) => statestatus.status)
    
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

    /* istanbul ignore next */
    const handleChangeNext = (value: any) : void => {
        setSelectedNext(value)
        setErrorSelectNext(false)
    }

    /* istanbul ignore next */
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

     /* istanbul ignore next */
    const proceedToArray = (value : any) => {
        let arrayCapabilities = []
        for(let element of value) {
            arrayCapabilities.push({ id : element.value, name: element.label })
        }
        return arrayCapabilities;
    }
      
     /* istanbul ignore next */
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
                onCreateConfigStatus(postData)
            } else {
                let updateData= {
                    name : data.name,
                    current : selectedStatus.label,
                    next: proceedToArray(selectedNext),
                    id: IdConfigStatus
                }
                onUpdateConfigStatus(updateData)
            }
            reset()
            setSelectedNext([])
            setSelectedStatus({})
        }
    }

     /* istanbul ignore next */
    const proceedNextToArray = (data:any) => {
        let dataArray = []
        for(let value of data) {
            dataArray.push({ value: value.id, label: value.name })
        }
        return dataArray;
    }

     /* istanbul ignore next */
    const clickUpdateConfigStatus = (row : any) => {
        let statusValue = {
            label: row.current,
            value: row.current
        }
        setValue("name", row.name);
        setSelectedStatus(statusValue)
        setIdConfigStatus(row.id)
        setSelectedNext(proceedNextToArray(row.next))
        setTimeout(() => {
            handleClickOpen()
        }, 100);
    }

     /* istanbul ignore next */
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
                    <Button onClick={() => onRemoveConfigStatus(row) } variant="outlined" color="error" size="small">
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];
    
    useEffect(() => {
        handleClose()
        onGetConfigStatus()
        onGetStatus()
        // eslint-disable-next-line
    },  [statusConfig.create, statusConfig.update, statusConfig.remove]);

    useEffect(() => {
        const proceedOptions = () => {
            let initialData = status.data
            let dataOptions = []
            /* istanbul ignore next */
            for(const value of initialData) {
                dataOptions.push({ value: value.id, label: value.name })
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
                    data={statusConfig?.data}
                    progressPending={statusConfig?.loading}
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
                            /* istanbul ignore next */
                            error={!!errors.name}
                            /* istanbul ignore next */
                            helperText={errors.name && errors.name.message}
                            /* istanbul ignore next */
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
                                options={optionsStatus}
                                onChange={handleChangeStatus}
                            />
                            { 
                            /* istanbul ignore next */
                            errorSelectedStatus ? <div className="error-p"><p>Status is required</p></div> : null }
                        </Box>
                        <Box pt={2}>
                            <Select
                                placeholder="Select Status Next"
                                value={selectedNext}
                                isMulti={true}
                                options={optionsStatus}
                                onChange={handleChangeNext}
                            />
                            { 
                            /* istanbul ignore next */
                            errorSelectNext ? <div className="error-p"><p>Status Next is required</p></div> : null }
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
