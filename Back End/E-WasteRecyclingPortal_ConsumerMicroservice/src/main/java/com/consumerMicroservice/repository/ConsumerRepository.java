package com.consumerMicroservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.consumerMicroservice.model.Consumer;

@Repository
public interface ConsumerRepository extends JpaRepository<Consumer, Integer>{
}
