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
import { 
    onGetModules,
    onCreateModules,
    onUpdateModules,
    onRemoveModules 
 } from './action/modulesAction';
import { onGetFeatures } from '../features/action/featuresAction';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { 
    DataRow,
    ModulesInput 
} from './modulesType'

import { 
    ISelectOption,
} from '../globalTypes'
import { fetchFlag } from '../flag/flagSlice';

const validationSchema = yup    
    .object({
        name: yup.string()
        .required("Name is required"),
        link: yup.string()
        .required("Link is required"),
    })
    .required();
  

    
function MasterModules() {

    const dispatch = useDispatch()
    const stateModules = useSelector((state : RootState) => state.modules)
    const features = useSelector((statefeature : RootState) => statefeature.features)
    const flag = useSelector((stateflag : RootState) => stateflag.flag)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
      } = useForm<ModulesInput>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const [selectedFlag, setSelectedFlag] = useState<ISelectOption>();
    const [selectedFeatures, setSelectedFeatures] = useState<ISelectOption[]>([]);

    const [optionsFeatures, setOptionsFeatures] = useState<ISelectOption[]>([]);
    const [optionsFlagModules, setOptionsFlagModules] = useState<ISelectOption[]>([]);

    const [errorSelectFlag, setErrorSelectFlag] = useState<boolean>(false);
    const [errorSelectFeatures, setErrorSelectFeatures] = useState<boolean>(false);

    const [open, setOpen] = useState(false);
    const [IdModules, setIdModules] = useState <any>(null);

    const [viewFeatures, setViewFeatures] = useState({
        open: false,
        features: []
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /* istanbul ignore next */

    const handleChangeFlag = (value: any) : void => {
        setSelectedFlag(value)
        setErrorSelectFlag(false)
    }

    /* istanbul ignore next */

    const handleChangeFeatures = (value: any) : void => {
        setSelectedFeatures(value)
        setErrorSelectFeatures(false)
    }

    /* istanbul ignore next */
    const proceedFeatureToArray = (value : any) => {
        let arrayIdFeatures = []
        for(let i=0; i < value.length; i++) {
            arrayIdFeatures.push(value[i].value)
        }
        return arrayIdFeatures;
    }
      
    /* istanbul ignore next */
    const onSubmit = (data: ModulesInput): void => {
        if(selectedFlag === undefined) {
            setErrorSelectFlag(true)
        } else if (selectedFeatures.length === 0) {
            setErrorSelectFeatures(true)
        } else {
            if(IdModules === null) {
                let postData= {
                    name : data.name,
                    link : data.link,
                    flag : selectedFlag.value,
                    feature_ids : proceedFeatureToArray(selectedFeatures),
                    id: IdModules
                }
                onCreateModules(postData)
                reset()
            } else {
                let updateData= {
                    name : data.name,
                    link : data.link,
                    flag : selectedFlag.value,
                    feature_ids : selectedFeatures,
                    id: IdModules
                }
                onUpdateModules(updateData)
                reset()
            }
        }
    }

    /* istanbul ignore next */
    const onClickUpdate = (row : any) => {
        setValue("name", row.name);
        setValue("link", row.link);
        setIdModules(row.id)
        setSelectedFlag(row.flag)
        setSelectedFeatures(row.features)
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
            name: 'LINK',
            selector: row => row.link,
        },
        {
            name: 'FLAG',
            selector: row => row.flag,
        },
        {
            name: 'FEATURES',
            width: '200px',
            cell: (row) => (
                <Stack direction="row" spacing={2}>
                    <Button 
                        variant="text" color="success" size="small"
                        onClick={() => setViewFeatures({...viewFeatures, open: true})}
                    >
                        View Features
                    </Button>
                </Stack>
            ),
        },
        {
            name: 'ACTION',
            width: '200px',
            cell: (row) => (
                <Stack direction="row" spacing={2}>
                    <Button 
                        variant="outlined" color="primary" size="small"
                        onClick={() => onClickUpdate(row)}
                    >
                        Update
                    </Button>
                    <Button onClick={() => onRemoveModules(row) } variant="outlined" color="error" size="small">
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];
    
    useEffect(() => {
        handleClose()
        onGetModules()
        onGetFeatures()
        dispatch(fetchFlag())
        // eslint-disable-next-line
    },  [stateModules.create, stateModules.update, stateModules.remove]);

    /* istanbul ignore next */
    useEffect(() => {
        if(flag?.data) {
            setOptionsFlagModules(flag.data)
        }
    }, [flag]);


    useEffect(() => {
        const proceedOptions = () => {
            let initialData = features.data
            let dataOptions = []
            /* istanbul ignore next */
            for(let i=0; i < initialData.length; i++) {
                dataOptions.push({ value: initialData[i].id, label: initialData[i].name })
            }
            setOptionsFeatures(dataOptions)
        }
        proceedOptions()
    }, [features]);

    return (
        <div>
            <Box pb={2}>
                <BreadCrumbs
                    current="Modules"
                    isPage={false}
                />
            </Box>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <h2>Master Modules</h2>
                <Button 
                    variant="contained" color="primary" size="small" 
                    onClick={() => {
                        handleClickOpen()
                        reset()
                    }}
                >
                    Create New Modules
                </Button>
            </Stack>
            <Box pt={4}>
                <TableData 
                    columns={columns}
                    data={stateModules?.data}
                    progressPending={stateModules?.loading}
                />
            </Box>

            {/* Open Add New Modules */}
            <Dialog 
                open={open} 
                fullWidth={true}
                maxWidth="md"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Add New Modules</DialogTitle>
                    <div className="box-modal-modules">
                        <TextField
                            /* istanbul ignore next */
                            error={!!errors.name}
                            /* istanbul ignore next */
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
                        <TextField
                            /* istanbul ignore next */
                            error={!!errors.link}
                            /* istanbul ignore next */
                            helperText={errors.link && errors.link.message}
                            {...register('link')}
                            margin="normal"
                            fullWidth
                            size="small"
                            name="link"
                            label="Link Route"
                            type="text"
                            id="link"
                            autoComplete="link"
                        />
                        <Box pt={2}>
                            <Select
                                placeholder="Select Flag"
                                value={selectedFlag}
                                isSearchable={false}
                                options={optionsFlagModules}
                                onChange={handleChangeFlag}
                            />
                            
                            {
                                /* istanbul ignore next */
                                errorSelectFlag ? <div className="error-p"><p>Flag is required</p></div> : null 
                             }
                        </Box>
                        <Box pt={2}>
                            <Select
                                placeholder="Select Feature"   
                                value={selectedFeatures}
                                isMulti={true}
                                options={optionsFeatures}
                                onChange={handleChangeFeatures}
                            />
                            { 
                                /* istanbul ignore next */
                                errorSelectFeatures ? <div className="error-p"><p>Feature is required</p></div> : null }
                        </Box>
                        
                    </div>
                    <DialogActions>
                        <Button onClick={handleClose} color="warning">Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* View Detail Features */}
            <Dialog 
                open={viewFeatures.open} 
                fullWidth={true}
                maxWidth="sm"
            >
                <div>
                    <DialogTitle>List All Features</DialogTitle>
                    
                    <DialogActions>
                        <Button onClick={() => {
                            /* istanbul ignore next */
                            setViewFeatures({...viewFeatures, open: false})
                            }
                        } color="warning">Cancel</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    )   
}

export default MasterModules;
