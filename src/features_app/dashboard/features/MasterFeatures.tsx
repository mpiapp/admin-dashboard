/* istanbul ignore file */
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
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store';
import { fetchFeatures, postFeatures, removeFeatures, updateFeatures } from './featuresSlice';
import { onGetCapability } from '../capabilities/action/dispatchAction';
import { fetchFlag } from '../flag/flagSlice';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { 
    FeaturesInput,
    DataRow 
} from './featuresTypes'

import { 
    ISelectOption,
} from '../globalTypes'

const validationSchema = yup    
    .object({
        name: yup.string()
        .required("Name is required")
    }) 

    
function MasterFeatures() {
      
    const dispatch = useDispatch()
    const state = useSelector((state : RootState) => state.features)
    const capabilities = useSelector((state : RootState) => state.capabilities)
    const flag = useSelector((state : RootState) => state.flag)
    
    const [open, setOpen] = useState(false);
    const [IdCapability, setIdCapability] = useState <any>(null);

    const [options, setOptions] = useState<ISelectOption[]>([]);
    const [optionsFlagFeatures, setOptionsFlagFeatures] = useState<ISelectOption[]>([]);

    const [selectedFlagFeatures, setSelectedFlagFeatures] = useState<ISelectOption>();
    const [selectedOption, setSelectedOption] = useState<ISelectOption[]>([]);

    const [errorSelectFlagFeatures, setErrorSelectFlagFeatures] = useState<boolean>(false);
    const [errorSelect, setErrorSelect] = useState<boolean>(false);

    const handleChange = (value: any) : void => {
        setSelectedOption(value)
    }

    const handleChangeFlagFeatures = (value: any) : void => {
        setSelectedFlagFeatures(value)
        setErrorSelectFlagFeatures(false)
    }

    const handleClickOpen = () : void => {
        setOpen(true);
    };

    const handleClose = () : void => {
        setOpen(false);
    };

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
      } = useForm<FeaturesInput>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const proceedToArray = (value : any) => {
        let arrayCapabilities = []
        for(let i=0; i < value.length; i++) {
            arrayCapabilities.push(value[i].value)
        }
        return arrayCapabilities;
    }
      
    const onSubmit = (data: FeaturesInput): void => {
        if(selectedFlagFeatures === undefined) {
            setErrorSelectFlagFeatures(true)
        } else if(selectedOption.length === 0) {
            setErrorSelect(true)
        } else {
            if(IdCapability === null) {
                let postData= {
                    name : data.name,
                    flag : selectedFlagFeatures.value,
                    capabilities: proceedToArray(selectedOption),
                }
                dispatch(postFeatures(postData))
                reset()
            } else {
                let updateData= {
                    name : data.name,
                    flag : selectedFlagFeatures.value,
                    capabilities: proceedToArray(selectedOption),
                    id: IdCapability
                }
                dispatch(updateFeatures(updateData)) 
                reset()
            }
        }
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
            name: 'FLAG',
            selector: row => row.flag,
        },
        {
            name: 'CAPABILITIES',
            cell: (row) => (
                <>
                    {
                        row.capabilities.map((value : any, index : any) => (
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
                            setIdCapability(row.id)
                            setSelectedOption(row.capabilities)
                            setTimeout(() => {
                                handleClickOpen()
                            }, 100);
                        }}
                    >
                        Update
                    </Button>
                    <Button onClick={() => dispatch(removeFeatures(row)) } variant="outlined" color="error" size="small">
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];
    
    useEffect(() => {
        handleClose()
        dispatch(fetchFeatures())
        onGetCapability()
        dispatch(fetchFlag())
        // eslint-disable-next-line
    },  [state.create, state.update, state.remove]);

    useEffect(() => {
        if(flag?.data) {
            setOptionsFlagFeatures(flag.data)
        }
    }, [flag]);

    useEffect(() => {
        const proceedOptions = () => {
            let initialData = capabilities.data
            let dataOptions = []

            for(let i=0; i < initialData.length; i++) {
                dataOptions.push({ value: initialData[i].id, label: initialData[i].name })
            }
            setOptions(dataOptions)
        }
        proceedOptions()
    }, [capabilities]);

    return (
        <div>
            <Box pb={2}>
                <BreadCrumbs
                    current="Features"
                    isPage={false}
                />
            </Box>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <h2>Master Features</h2>
                <Button 
                    variant="contained" color="primary" size="small" 
                    onClick={() => {
                        handleClickOpen()
                        reset()
                    }}
                >
                    Create New Feature
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
                <form onSubmit={handleSubmit(onSubmit)} >
                    <DialogTitle>Add New Feature</DialogTitle>
                    <div className="box-modal-create">
                        <TextField
                            error={!!errors.name}
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
                                placeholder="Select Flag"
                                value={selectedFlagFeatures}
                                isSearchable={false}
                                options={optionsFlagFeatures}
                                onChange={handleChangeFlagFeatures}
                            />
                            { errorSelectFlagFeatures ? <div className="error-p"><p>Flag is required</p></div> : null }
                        </Box>
                        <Box pt={2}>
                            <Select
                                placeholder="Select capabilities"
                                value={selectedOption}
                                isMulti={true}
                                options={options && options}
                                onChange={handleChange}
                            />
                            { errorSelect ? <div className="error-p"><p>Capability is required</p></div> : null }
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

export default MasterFeatures
